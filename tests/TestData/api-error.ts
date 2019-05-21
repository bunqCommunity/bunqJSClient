export default (status = 500) => {
    return {
        status: status,
        response: {
            Error: [
                {
                    error_description: "string",
                    error_description_translated: "string"
                }
            ]
        }
    };
};
