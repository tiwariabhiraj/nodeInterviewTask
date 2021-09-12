const mongoose = require('mongoose');
import { MONGO_CRED } from "../constant/constant"
import { messageController } from "../controller/messageController"
export class ConnectToDatabase {
    constructor(type: string) {
        switch (type) {
            case MONGO_CRED.MAIN_THREAD: {
                this.DatabaseConnected();
                break;
            }
            case MONGO_CRED.WORKER_THREAD: {
                this.DatabaseConnectionForWorkerThread();
                break;
            }
        }

    }
    async DatabaseConnected() {
        try {
            await mongoose.connect(MONGO_CRED.MONGO_DB_URL)
            console.log('******Database successfully connected******');
            ConnectToDatabase.recoverScheduledMessage()
            return
        } catch (error) {
            throw error
        }
    }

    async DatabaseConnectionForWorkerThread() {
        try {
            await mongoose.connect(MONGO_CRED.MONGO_DB_URL)
            console.log('******Database successfully connected for worker thread******');
            return
        } catch (error) {
            throw error
        }
    }

    static recoverScheduledMessage() {
        try {
            messageController.sendTempMessageToPermanentMessage()
            return
        } catch (error) {
            throw error
        }
    }

}
