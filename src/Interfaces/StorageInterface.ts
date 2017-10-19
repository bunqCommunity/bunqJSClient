export default interface StorageInterface {
    get(key: string): Promise<any> | any;
    set(key: string, value: any): Promise<any> | void;
    remove(key: string): Promise<boolean | null> | void;
};
