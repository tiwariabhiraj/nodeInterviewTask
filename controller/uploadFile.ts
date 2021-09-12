const { parentPort, receiveMessageOnPort, isMainThread } = require('worker_threads');
import { controller } from "./insertController"
import { ConnectToDatabase } from "../DatabaseConnection/connect";
import { ASSIGNED_WORK_TYPE, MONGO_CRED } from "../constant/constant"
parentPort.on('message', async (data: any) => {
    try {
        if (data.type == ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT) {
            await controller.uploadCsv(Buffer.from(data.data));
            parentPort.postMessage({ type: ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT })
        }
    } catch (error) {
        throw error
    }
})
const init = async () => {
    try {
        return await new ConnectToDatabase(MONGO_CRED.WORKER_THREAD);   // Make separate connection for database for worker thread
    } catch (error) {
        throw error
    }
}

init();

