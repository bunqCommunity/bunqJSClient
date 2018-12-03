class CustomError extends Error {
    public name: string;
    public response: string | false = false;
    public errorCode: string | false = false;

    constructor(error, response: false | any = false, errorCode: false | string = false) {
        super(error);

        this.name = "CustomError";
        this.response = response;
        this.errorCode = errorCode;
    }
}


export default CustomError;
