type ApiAdapterOptions = {
    axiosOptions?: any;
    isEncrypted?: boolean;
    includesFile?: boolean;
    disableVerification?: boolean;
    disableAuthentication?: boolean;
    disableSigning?: boolean;
    skipSessionCheck?: boolean;
};

export default ApiAdapterOptions;
