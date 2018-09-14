export const sessionId = 44;
export const sessionToken =
    "a4f9d888eea84f52722b9baf2f17c289d549edf6e0eccdbf868eb922be306fb6";
export const sessionTokenId = 839;

export default () => {
    const date = new Date();
    const dateTime = `${date.getFullYear()}-${date.getFullYear()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;

    return {
        status: 200,
        response: {
            Response: [
                {
                    Id: {
                        id: sessionId
                    }
                },
                {
                    Token: {
                        id: sessionTokenId,
                        token: sessionToken,
                        created: dateTime
                    }
                },
                {
                    UserApiKey: {
                        id: 421,
                        created: "2018-09-14 17:00:28.677013",
                        updated: "2018-09-14 17:01:33.741592",
                        requested_by_user: {
                            UserPerson: {
                                display_name: "Sandbox user",
                                public_nick_name: "Sandbox user",
                                avatar: {
                                    uuid:
                                        "d0ad99ff-7a9e-44fc-bd9c-785009434125",
                                    image: [
                                        {
                                            attachment_public_uuid:
                                                "dd25d45f-2eae-4236-a5f1-ec8b9c3a4701",
                                            height: 640,
                                            width: 640,
                                            content_type: "image/jpeg"
                                        }
                                    ],
                                    anchor_uuid:
                                        "23aca1f8-81b3-46d2-a9cf-5a2f670c1cdc"
                                },
                                session_timeout: 300
                            }
                        },
                        granted_by_user: {
                            UserPerson: {
                                display_name: "Sandbox user",
                                public_nick_name: "Sandbox user",
                                avatar: {
                                    uuid:
                                        "d0ad99ff-7a9e-44fc-bd9c-785009434125",
                                    image: [
                                        {
                                            attachment_public_uuid:
                                                "dd25d45f-2eae-4236-a5f1-ec8b9c3a4701",
                                            height: 640,
                                            width: 640,
                                            content_type: "image/jpeg"
                                        }
                                    ],
                                    anchor_uuid:
                                        "23aca1f8-81b3-46d2-a9cf-5a2f670c1cdc"
                                },
                                session_timeout: 300
                            }
                        }
                    }
                }
            ]
        }
    };
};
