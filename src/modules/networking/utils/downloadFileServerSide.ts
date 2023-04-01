import axios from "axios";
import { createWriteStream } from "fs";

// https://stackoverflow.com/questions/55374755/node-js-axios-download-file-stream-and-writefile
export async function downloadFileServerSide(fileUrl: string, outputLocationPath: string) {
    const writer = createWriteStream(outputLocationPath);

    return axios.get(fileUrl, {
        method: "get",
        responseType: "stream",
    }).then(response => {
        return new Promise((resolve, reject) => {
            response.data.pipe(writer);

            writer.on("error", error => {
                writer.close();
                reject(error);
            });

            writer.on("close", () => {
                resolve(true);
            });
        });
    });
}