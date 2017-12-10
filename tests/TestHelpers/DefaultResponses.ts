import apiInstallation from "../TestData/api-installation";
import apiDeviceServer from "../TestData/api-installation";

export const installation = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            // delay the response
            setTimeout(() => {
                moxios.requests
                    .mostRecent()
                    .respondWith(apiInstallation())
                    .then(resolve)
                    .catch(reject);
            }, 300);
        });
    });
};

export const deviceServer = async moxios => {
    await new Promise((resolve, reject) => {
        moxios.wait(() => {
            // delay the response
            setTimeout(() => {
                moxios.requests
                    .mostRecent()
                    .respondWith(apiDeviceServer())
                    .then(resolve)
                    .catch(reject);
            }, 300);
        });
    });
};
