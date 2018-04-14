export const deviceId = 35;

export default (success: boolean | number = true) => {
    if (success === true) {
        return {
            status: 200,
            response: {
                Response: [
                    {
                        Id: {
                            id: deviceId
                        }
                    }
                ]
            }
        };
    }

    switch (success) {
        case 400:
            return {
                status: 400,
                response: {
                    Error: [
                        {
                            error_description: "access denied"
                        }
                    ]
                }
            };

        case 500:
        default:
            return {
                status: 500,
                response: {
                    Error: [
                        {
                            error_description: "something went wrong at bunq"
                        }
                    ]
                }
            };
    }
};
