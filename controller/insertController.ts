import { view } from "../view/view"
import fs from "fs"
const reader = require('xlsx')
const path = require("path");
const { Worker, isMainThread, parentPort } = require('worker_threads');
let worker: any;
import { ASSIGNED_WORK_TYPE } from "../constant/constant"
if (isMainThread) {
    const modulePath = path.resolve(__dirname, `uploadFile.js`);
    worker = new Worker(modulePath);
    worker.on('message', (message: any) => {
        console.log("Got a message from worker");
    });
    worker.on('exit', () => {
        console.log('Worker thread Exit');
    })
}

class Controller {

    fileupload = async (csvFile: any) => {
        new Promise((resolve, reject) => {
            fs.writeFileSync("test.xlsx", csvFile);
            resolve({});
        })
    }

    async assignToChildProcess(request: any, response: any) {
        try {
            worker.postMessage({ data: request.files.csvsheet.data, type: ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT });
            worker.on('message', (message: any) => {
                if (message.type == ASSIGNED_WORK_TYPE.UPLOAD_DOCUMENT)
                    response.send("File Uploaded Successfully")
            });
        } catch (error) {
            throw error
        }
    }

    async uploadCsv(csvBufferData?: any) {
        try {
            await controller.fileupload(csvBufferData)
            const file = reader.readFileSync('./test.xlsx')
            fs.unlink('./test.xlsx', (err: any) => {
                if (err) throw err;
                console.log("csv file deleted successfully");
            });
            let data: any = []
            const sheets = file.SheetNames
            for (let i = 0; i < sheets.length; i++) {
                const temp = reader.utils.sheet_to_json(
                    file.Sheets[file.SheetNames[i]])
                temp.forEach((response: any) => {
                    data.push(response)
                })
            }
            await controller.uploadDocumentIntoDatabase(data)
            return
        } catch (error) {
            throw error;
        }
    }


    async insertDataInMongoDatabase(data: any) {
        return new Promise(async (resolve, reject) => {
            Promise.all([
                view.insertAccountData(data),
                view.insertAgentData(data),
                view.insertpolicyCategoryData(data),
            ]).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    async insertUserAndCompanyData(data: any) {
        return new Promise(async (resolve, reject) => {
            Promise.all([
                view.insertUserData(data),
                view.insertPolicyCarrierData(data),
            ]).then(data => {
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    }

    async insertSynchronousData(data: any) {
        try {
            let insertedData: any
            for (let insertData of data) {
                insertedData = await controller.insertUserAndCompanyData(insertData);
                insertData['userId'] = insertedData[0]._id;
                insertData['company_id'] = insertedData[1]._id;
                view.insertPolicyInfoData(insertData);
            }
            return
        } catch (error) {
            throw error
        }
    }

    async uploadDocumentIntoDatabase(data: any) {
        try {
            controller.insertDataInMongoDatabase(data);  // Asynchronous task
            await controller.insertSynchronousData(data) // Synchronous task
            return;
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(request: any, response: any) {
        if (!request.files) {
            response.send("File was not found");
            return;
        }
        controller.uploadCsv(request.files.csvsheet.data);
        response.send("File is uploading it will take some time to complete the task,Thanku! ");
    }


}
export const controller = new Controller()