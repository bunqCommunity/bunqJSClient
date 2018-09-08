"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoteAttachment {
    /**
     * @param {ApiAdapter} ApiAdapter
     */
    constructor(ApiAdapter) {
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
    createEndpoint(eventType, eventId = false, secondaryEventId = false) {
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
    async get(eventType, userId, monetaryAccountId, eventId, noteTextId, secondaryEventId = false, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`);
        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-attachment/${noteTextId}`;
        const response = await limiter.run(async () => this.ApiAdapter.get(fullEndpoint));
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
    async list(eventType, userId, monetaryAccountId, eventId, secondaryEventId = false, options = {}) {
        const params = {};
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
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-attachment`;
        const response = await limiter.run(async () => this.ApiAdapter.get(fullEndpoint), {}, {
            axiosOptions: {
                params: params
            }
        });
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
    async post(eventType, userId, monetaryAccountId, eventId, attachment_id, description = false, secondaryEventId = false, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "POST");
        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-attachment`;
        // format the body
        const bodyData = {
            attachment_id: attachment_id
        };
        if (description)
            bodyData.description = description;
        const response = await limiter.run(async () => this.ApiAdapter.post(fullEndpoint, bodyData));
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
    async put(eventType, userId, monetaryAccountId, eventId, noteTextId, attachment_id, description = false, secondaryEventId = false, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "PUT");
        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-attachment/${noteTextId}`;
        // format the body
        const bodyData = {
            attachment_id: attachment_id
        };
        if (description)
            bodyData.description = description;
        const response = await limiter.run(async () => this.ApiAdapter.put(fullEndpoint, bodyData));
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
    async delete(eventType, userId, monetaryAccountId, eventId, noteTextId, secondaryEventId = false, options = {}) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-attachment`, "DELETE");
        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;
        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-attachment/${noteTextId}`;
        const response = await limiter.run(async () => this.ApiAdapter.delete(fullEndpoint));
        return response.Response;
    }
}
exports.default = NoteAttachment;
