export default interface StorageInterface {
    get(key: string): any;
    set(key: string, value: any): void;
    remove(key: string): void;
};
