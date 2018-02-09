const JsonDB = require("node-json-db");

class CustomDb {
    private db;

    /**
     * @param {string} name
     * @param {boolean} resetOnLoad
     */
    constructor(name = "default", resetOnLoad = true) {
        this.db = new JsonDB(`tests/custom-db/${name}`, true, true);

        if (resetOnLoad) {
            // reset the data
            this.removeAl();
        }
    }

    /**
     * @param {string} key
     * @returns {Promise<string>}
     */
    public async get(key: string) {
        try {
            return this.db.getData(`/${key}`);
        } catch (exception) {
            return null;
        }
    }

    /**
     * @param {string} key
     * @param {string} value
     * @returns {Promise<void>}
     */
    public async set(key: string, value: string) {
        this.db.push(`/${key}`, value);
    }

    /**
     * @param {string} key
     * @returns {Promise<void>}
     */
    public async remove(key: string) {
        this.db.delete(`/${key}`);
    }

    /**
     * @returns {void}
     */
    public removeAl() {
        this.db.data = {};
        this.db.save(true);
    }
}

export default CustomDb;
