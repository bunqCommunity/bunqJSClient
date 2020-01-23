#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const prettier = require("prettier");

// Primitives only!
const TYPES = {
    string: "string",
    int: "number",
    integer: "number",
    float: "number",
    double: "number",
    number: "number",
    bool: "boolean",
    boolean: "boolean",
};

// Primitive classes only!
const RESERVED_TYPES = [
    "Error",
    "Array",
];

// Custom types to be added
const CUSTOM_TYPES = {
    BunqId: ` string`,
    AssignmentType: ` "PRIMARY" | "SECONDARY" | "TERTIARY"`,
    CardType: ` "MAESTRO" | "MASTERCARD" | "MAESTRO_MOBILE_NFC"`,
    NoteEventType: `
    | "bunqme-fundraiser-result"
    | "draft-payment"
    | "ideal-merchant-transaction"
    | "mastercard-action"
    | "payment-batch"
    | "payment"
    | "request-inquiry-batch"
    | "request-inquiry"
    | "request-response"
    | "schedule"
    | "sofort-merchant-transaction"
    | "switch-service-payment"
    | "whitelist"`,
    NotificationCategoryType: `
    | "BILLING"
    | "CARD_TRANSACTION_FAILED"
    | "CARD_TRANSACTION_SUCCESSFUL"
    | "CHAT"
    | "DRAFT_PAYMENT"
    | "IDEAL"
    | "SOFORT"
    | "MONETARY_ACCOUNT_PROFILE"
    | "MUTATION"
    | "PAYMENT"
    | "PROMOTION"
    | "REQUEST"
    | "SCHEDULE_RESULT"
    | "SCHEDULE_STATUS"
    | "SHARE"
    | "SUPPORT"
    | "TAB_RESULT"
    | "USER_APPROVAL"`,
    NotificationDeliveryMethodType: `
    | "URL"
    | "PUSH"`,
    RecurrenceUnitType: `"ONCE" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY"`,
    ScheduleStatusType: `"ACTIVE" | "FINISHED" | "CANCELLED"`,
    ShareInviteMonetaryAccountResponseStatus: `
    | "REVOKED"
    | "ACCEPTED"
    | "CANCELLED"
    | "CANCELLATION_PENDING"
    | "CANCELLATION_ACCEPTED"
    | "CANCELLATION_REJECTED"`
};

// Type overrides.
// Target object is the Open API schema. References can be made to both schema types and `CUSTOM_TYPES`.
const TYPE_OVERRIDES = {
    CardPinAssignment: {
        type: "AssignmentType",
    },
    NotificationFilter: {
        notification_delivery_method: "NotificationDeliveryMethodType",
        category: "NotificationCategoryType",
    },
    Schedule: {
        recurrence_unit: "RecurrenceUnitType",
        status: "ScheduleStatusType",
    },
};

// Required overrides.
// `true` means required, `false` means optional.
const REQUIRED_OVERRIDES = {
    Address: {
        street: true,
        house_number: true,
        postal_code: true,
        city: true,
        country: true,
        po_box: true,
    },
    Amount: {
        value: true,
        currency: true,
    },
    CardCountryPermission: {
        country: true,
        expiry_time: true,
    },
    CardPinAssignment: {
        type: true,
        monetary_account_id: true,
    },
    Geolocation: {
        latitude: true,
        longitude: true,
    },
    LabelMonetaryAccount: {
        type: true,
        value: true,
    },
    NotificationFilter: {
        notification_delivery_method: true,
        notification_target: true,
        category: true,
    },
    Schedule: {
        time_start: true,
        recurrence_size: true,
        recurrence_unit: true,
    },
};

function capitalize(str) {
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

function camelCase(name) {
    return name.replace(/(-|_|\.|\s)+\w/g, (letter) =>
        letter.toUpperCase().replace(/[^0-9a-z]/gi, "")
    );
}

function sanitize(name) {
    return name.includes("-") ? `'${name}'` : name;
}

function spacesToUnderscores(name) {
    return name.replace(/\s/g, "_");
}

function generateCustomTypes() {
    let output = "";
    for (const [name, customType] of Object.entries(CUSTOM_TYPES)) {
        output += `export type ${name} =${customType};
`;
    }

    return output;
}

function applyAliases(input) {
    return input.replace(/ShareInviteBank/g, "ShareInviteMonetaryAccount");
}

function parse(spec, options= {}) {
    const shouldCamelCase = options.camelcase || false;

    const queue = [];

    const interfaces = {};

    const { definitions } = spec;

    function getRef(lookup) {
        const ID = lookup.replace("#/components/schemas/", "");
        const ref = definitions[ID];
        return [ID, ref];
    }

    // Returns primitive type, or 'object' or 'any'
    function getType(definition, nestedName) {
        const { $ref, items, type, ...value } = definition;

        const nextInterface = camelCase(nestedName); // if this becomes an interface, it’ll need to be camelCased

        const DEFAULT_TYPE = "any";

        if ($ref) {
            const [refName, refProperties] = getRef($ref);
            const convertedRefName = spacesToUnderscores(refName);
            // If a shallow array interface, return that instead
            if (refProperties.items && refProperties.items.$ref) {
                return getType(refProperties, refName);
            }
            if ((TYPE_OVERRIDES[refName] || {})[refProperties.type]) {
                return TYPE_OVERRIDES[refName][refProperties.type];
            }
            if (refProperties.type && TYPES[refProperties.type]) {
                return TYPES[refProperties.type];
            }
            if (convertedRefName) {
                if (RESERVED_TYPES.concat(Object.keys(CUSTOM_TYPES)).includes(convertedRefName)) {
                    return convertedRefName;
                }
                return `I${convertedRefName}`;
            }

            return DEFAULT_TYPE;
        }

        if (items && items.$ref) {
            const [refName] = getRef(items.$ref);
            return `Array<${getType(items, refName)}>`;
        }

        if (items && items.type) {
            // if an array, keep nesting
            if (items.type === "array") {
                return `Array<${getType(items, nestedName)}>`;
            }
            // else if primitive, return type
            if (TYPES[items.type]) {
                return `Array<${TYPES[items.type]}>`;
            }
            // otherwise if this is an array of nested types, return that interface for later
            queue.push([nextInterface, items]);
            return `Array<${nextInterface}>`;
        }

        if (Array.isArray(value.oneOf)) {
            return value.oneOf.map((def) => getType(def, "")).join(" | ");
        }

        if (value.properties) {
            // If this is a nested object, let’s add it to the stack for later
            queue.push([nextInterface, { $ref, items, type, ...value }]);
            return nextInterface;
        }

        if (type) {
            return TYPES[type] || type || DEFAULT_TYPE;
        }

        return DEFAULT_TYPE;
    }

    function buildNextInterface() {
        const singleInterface = [];
        const nextObject = queue.pop();
        if (!nextObject) return;
        let [ID, { allOf, properties, required, readOnly, additionalProperties, type }] = nextObject;

        let allProperties = properties || {};
        const includes = [];

        // Include allOf, if specified
        if (Array.isArray(allOf)) {
            allOf.forEach((item) => {
                // Add “implements“ if this references other items
                if (item.$ref) {
                    const [refName] = getRef(item.$ref);
                    includes.push(refName);
                } else if (item.properties) {
                    allProperties = { ...allProperties, ...item.properties };
                }
            });
        }

        // If nothing’s here, let’s skip this one.
        if (
            !Object.keys(allProperties).length &&
            additionalProperties !== true &&
            type &&
            TYPES[type]
        ) {
            return;
        }
        // Open interface
        const isExtending = includes.length ? ` extends ${includes.join(', ')}` : '';
        const interfaceName = `I${shouldCamelCase ? camelCase(ID) : spacesToUnderscores(ID)}`;

        singleInterface.push(
            `export interface ${interfaceName}${isExtending} {`
        );

        // Populate interface
        Object.entries(allProperties).forEach(([key, value]) => {
            const optional = !((required || []).includes(key) || !!((REQUIRED_OVERRIDES[ID] || {})[key]));
            const readOnly = value.readOnly ? 'readonly ' : '';
            const formattedKey = shouldCamelCase ? camelCase(key) : key;
            const name = `${sanitize(formattedKey)}${optional ? "?" : ""}`;
            const newID = `${ID}${capitalize(formattedKey)}`;
            const interfaceType = (TYPE_OVERRIDES[ID] || {})[key] || getType(value, newID);

            if (typeof value.description === "string") {
                // Print out descriptions as jsdoc comments, but only if there’s something there (.*)
                singleInterface.push(`/**\n* ${value.description.replace(/\n$/, "").replace(/\n/g, "\n* ")}\n*/`);
            }

            // Handle enums in the same definition
            if (Array.isArray(value.enum)) {
                singleInterface.push(`${readOnly}${name}: ${value.enum.map(option => JSON.stringify(option)).join(" | ")};`);
                return;
            }

            singleInterface.push(`${readOnly}${name}: ${interfaceType}`);
        });

        if (additionalProperties) {
            if ((additionalProperties) === true) {
                singleInterface.push('[name: string]: any');
            }

            if ((additionalProperties).type) {
                const interfaceType = getType(additionalProperties, "");
                singleInterface.push(`[name: string]: ${interfaceType}`);
            }
        }

        // Close interface
        singleInterface.push('}');

        interfaces[interfaceName] = (prettier.format(singleInterface.join("\n"), { parser: "typescript", singleQuote: true }));
    }

    // Begin parsing top-level entries
    Object.entries(definitions).forEach((entry) => {
        // Ignore top-level array definitions
        if (entry[1].type === "object") {
            queue.push(entry);
        }
    });
    queue.sort((a, b) => a[0].localeCompare(b[0]));
    while (queue.length > 0) {
        buildNextInterface();
    }

    return interfaces;
}

(async function () {
    try {
        const bunqDocs = JSON.parse(applyAliases(JSON.stringify((await axios.get("https://raw.githubusercontent.com/bunq/doc/master/swagger.json")).data)));
        const interfaces = parse({ definitions: bunqDocs.components.schemas });
        let output = "";
        for (const singleInterface of Object.values(interfaces)) {
            output += `${singleInterface}
`;
        }
        output += generateCustomTypes();
        fs.writeFileSync(path.join(__dirname, "../../src/Types/ApiTypes.ts"), output);
    } catch (e) {
        console.error(e);
    }
})();
