import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import NoteEventType from "../Types/NoteEventType";

export default class NoteAttachment implements ApiEndpointInterface {
    ApiAdapter: ApiAdapter;
    Session: Session;

    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter: ApiAdapter) {
        this.ApiAdapter = ApiAdapter;
        this.Session = ApiAdapter.Session;
    }

    /**
     * Generates the base url for the different variable endpoints based on eventType
     * @param {NoteEventType} eventType
     * @param {false | number} eventId
     * @param {false | number} secondaryEventId
     * @returns {string}
     */
    private createEndpoint(
        eventType: NoteEventType,
        eventId: false | number = false,
        secondaryEventId: false | number = false
    ): string {
        switch (eventType) {
            case "schedule":
                return `schedule/${eventId}/schedule-instance/${secondaryEventId}`;
            case "whitelist":
                return `whitelist/${eventId}/whitelist-result/${secondaryEventId}`;
            default:
                return `${eventType}/${eventId}`;
        }
    }

    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {number} noteTextId
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    public async get(
        eventType: NoteEventType,
        userId: number,
        monetaryAccountId: number,
        eventId: number,
        noteTextId: number,
        secondaryEventId: false | number = false,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`);

        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;

        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(
            eventType,
            eventId,
            secondaryEventId
        )}/note-attachment/${noteTextId}`;

        const response = await limiter.run(async axiosClient => this.ApiAdapter.get(fullEndpoint));

        return response.Response[0];
    }

    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    public async list(
        eventType: NoteEventType,
        userId: number,
        monetaryAccountId: number,
        eventId: number,
        secondaryEventId: false | number = false,
        options: any = {}
    ) {
        const params: any = {};

        if (options.count !== undefined) {
            params.count = options.count;
        }
        if (options.newer_id !== false && options.newer_id !== undefined) {
            params.newer_id = options.newer_id;
        }
        if (options.older_id !== false && options.older_id !== undefined) {
            params.older_id = options.older_id;
        }

        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "LIST");

        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;

        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(
            eventType,
            eventId,
            secondaryEventId
        )}/note-attachment`;

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.get(
                fullEndpoint,
                {},
                {
                    axiosOptions: {
                        params: params
                    }
                },
                axiosClient
            )
        );

        return response.Response;
    }

    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {number} attachment_id
     * @param {false | string} description
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    public async post(
        eventType: NoteEventType,
        userId: number,
        monetaryAccountId: number,
        eventId: number,
        attachment_id: number,
        description: false | string = false,
        secondaryEventId: false | number = false,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "POST");

        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;

        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(
            eventType,
            eventId,
            secondaryEventId
        )}/note-attachment`;

        // format the body
        const bodyData: any = {
            attachment_id: attachment_id
        };
        if (description) bodyData.description = description;

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.post(fullEndpoint, bodyData, {}, {}, axiosClient)
        );

        return response.Response;
    }

    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {number} noteTextId
     * @param {number} attachment_id
     * @param {false | string} description
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    public async put(
        eventType: NoteEventType,
        userId: number,
        monetaryAccountId: number,
        eventId: number,
        noteTextId: number,
        attachment_id: number,
        description: false | string = false,
        secondaryEventId: false | number = false,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "PUT");

        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;

        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(
            eventType,
            eventId,
            secondaryEventId
        )}/note-attachment/${noteTextId}`;

        // format the body
        const bodyData: any = {
            attachment_id: attachment_id
        };
        if (description) bodyData.description = description;

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.put(fullEndpoint, bodyData, {}, {}, axiosClient)
        );

        return response.Response;
    }

    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {number} noteTextId
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    public async delete(
        eventType: NoteEventType,
        userId: number,
        monetaryAccountId: number,
        eventId: number,
        noteTextId: number,
        secondaryEventId: false | number = false,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "DELETE");

        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;

        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(
            eventType,
            eventId,
            secondaryEventId
        )}/note-attachment/${noteTextId}`;

        const response = await limiter.run(async axiosClient =>
            this.ApiAdapter.delete(fullEndpoint, {}, {}, axiosClient)
        );

        return response.Response;
    }
}
