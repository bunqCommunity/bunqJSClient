import StorageInterface from "../Interfaces/StorageInterface";

export default (fileLocation: string): StorageInterface => {
    const JSONStore = require("json-store");
    const store = JSONStore(fileLocation);

    return {
        get: (key: string) => store.get(key),
        set: (key: string, value: any) => store.set(key, value),
        remove: (key: string) => store.set(key, null)
    };
};
