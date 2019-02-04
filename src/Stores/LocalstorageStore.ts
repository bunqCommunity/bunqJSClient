import StorageInterface from "../Interfaces/StorageInterface";

export default (options: any = {}): StorageInterface => {
    const store: StorageInterface = require("store");

    return store;
};
