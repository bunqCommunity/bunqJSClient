import apiInstallationRegistration from "../TestData/api-installation";
import apiDeviceRegistration from "../TestData/api-installation";
import apiSessionRegistration from "../TestData/api-session-registration";

export const installationRegistration = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            // delay the response
            setTimeout(() => {
                moxios.requests
                    .mostRecent()
                    .respondWith(apiInstallationRegistration())
                    .then(resolve)
                    .catch(reject);
            }, 300);
        });
    });
};

export const deviceServerRegistration = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            // delay the response
            setTimeout(() => {
                moxios.requests
                    .mostRecent()
                    .respondWith(apiDeviceRegistration())
                    .then(resolve)
                    .catch(reject);
            }, 300);
        });
    });
};

export const sessionRegistration = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            // delay the response
            setTimeout(() => {
                moxios.requests
                    .mostRecent()
                    .respondWith(apiSessionRegistration())
                    .then(resolve)
                    .catch(reject);
            }, 300);
        });
    });
};
