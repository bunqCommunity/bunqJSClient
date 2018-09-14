export default interface LoggerInterface {
    log(value: any): void;
    info(value: any): void;
    error(value: any): void;
    debug(value: any): void;
    trace(value: any): void;
}
