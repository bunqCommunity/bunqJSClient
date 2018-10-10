import ApiAdapter from "../ApiAdapter";
import Session from "../Session";
import ApiEndpointInterface from "../Interfaces/ApiEndpointInterface";
import NoteEventType from "../Types/NoteEventType";

export default class NoteText implements ApiEndpointInterface {
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-text`);

        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;

        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(
            eventType,
            eventId,
            secondaryEventId
        )}/note-text/${noteTextId}`;

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

        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-text`, "LIST");

        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;

        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-text`;

        const response = await limiter.run(
            async () => this.ApiAdapter.get(fullEndpoint),
            {},
            {
                axiosOptions: {
                    params: params
                }
            }
        );

        return response.Response;
    }

    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {string} content
     * @param {false | number} secondaryEventId
     * @param options
     * @returns {Promise<any>}
     */
    public async post(
        eventType: NoteEventType,
        userId: number,
        monetaryAccountId: number,
        eventId: number,
        content: string,
        secondaryEventId: false | number = false,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-text`, "POST");

        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;

        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(eventType, eventId, secondaryEventId)}/note-text`;

        const response = await limiter.run(async () =>
            this.ApiAdapter.post(fullEndpoint, {
                content: content
            })
        );

        return response.Response;
    }

    /**
     * @param {NoteEventType} eventType
     * @param {number} userId
     * @param {number} monetaryAccountId
     * @param {number} eventId
     * @param {number} noteTextId
     * @param {string} content
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
        content: string,
        secondaryEventId: false | number = false,
        options: any = {}
    ) {
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-text`, "PUT");

        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;

        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(
            eventType,
            eventId,
            secondaryEventId
        )}/note-text/${noteTextId}`;

        const response = await limiter.run(async () =>
            this.ApiAdapter.put(fullEndpoint, {
                content: content
            })
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
        const limiter = this.ApiAdapter.RequestLimitFactory.create(`/${eventType}/note-text`, "DELETE");

        // default base
        const endpointBase = `/v1/user/${userId}/monetary-account/${monetaryAccountId}`;

        // full endpoint url
        const fullEndpoint = `${endpointBase}/${this.createEndpoint(
            eventType,
            eventId,
            secondaryEventId
        )}/note-text/${noteTextId}`;

        const response = await limiter.run(async () => this.ApiAdapter.delete(fullEndpoint));

        return response.Response;
    }
}
