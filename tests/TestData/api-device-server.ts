export const deviceId = 35;

export default (success = true) => {
    return success
        ? {
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
          }
        : {
              status: 500,
              response: { error: "error description" }
          };
};
