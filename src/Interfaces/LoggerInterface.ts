export default interface LoggerInterface {
    log(value: any): void;
    info(value: any): void;
    error(value: any): void;
    debug(value: any): void;
    trace(value: any): void;

    // optional method which isn't used by default underlying library
    warn?(value: any): void;
}
