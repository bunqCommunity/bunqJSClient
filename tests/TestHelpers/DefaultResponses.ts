import apiInstallationRegistration from "../TestData/api-installation";
import apiDeviceRegistration from "../TestData/api-installation";
import apiSessionRegistration from "../TestData/api-session-registration";

export const defaultResponse = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            moxios.requests
                .mostRecent()
                .respondWith({
                    status: 200,
                    response: {
                        Response: [
                            {
                                payments: [],
                                Id: {},
                                Payment: {}
                            }
                        ]
                    }
                })
                .then(resolve)
                .catch(reject);
        });
    });
};

export const installationRegistration = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            moxios.requests
                .mostRecent()
                .respondWith(apiInstallationRegistration())
                .then(resolve)
                .catch(reject);
        });
    });
};

export const deviceServerRegistration = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            moxios.requests
                .mostRecent()
                .respondWith(apiDeviceRegistration())
                .then(resolve)
                .catch(reject);
        });
    });
};

export const sessionRegistration = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            moxios.requests
                .mostRecent()
                .respondWith(apiSessionRegistration())
                .then(resolve)
                .catch(reject);
        });
    });
};
