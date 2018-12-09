export default async (file: File): Promise<ArrayBuffer> => {
    const fileReader = new FileReader();

    // start loading the file as binary
    fileReader.readAsArrayBuffer(file);

    // wrap the filereader callback in a promise
    return new Promise<ArrayBuffer>(resolve => {
        // resolve the output onload
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
    });
};
