import { view } from "../view/view"
import moment from "moment"
import { messageValidator } from "../messageValidator/validator"
import { Types } from "mongoose";
class Message {
    async saveMessage(request: any, response: any) {
        try {
            console.log('workerId=>', process.pid);
            let message = request.body;
            let validationStatus = await messageValidator(message) // Validate message structure
            if (!validationStatus.status)
                response.send("Message Validation Failed!")
            message.expireTime = await messageController.tempMessageExpireTime(message.messageTime);
            let messageBody = await view.saveScheduledMessage(request.body);
            view.saveScheduledMessageToRedis(messageBody._id, message.expireTime - new Date().getTime()) // set timer for scheduled message 
            response.send("Message Scheduled")
        } catch (error) {
            throw error;
        }
    }

    async tempMessageExpireTime(time: any) {
        try {
            var CurrentDate: any = moment(time).format();
            return new Date(CurrentDate).getTime()
        } catch (error) {
            throw error;
        }
    }

    async savePermanentMessage(message: any) {
        try {
            view.savePermanentMessage(message)
        } catch (error) {
            throw error;
        }
    }

    async fetchScheduledMessage(messageId: string) {
        try {
            console.log('Schedulled message sending to permanent message');
            let message: any = await view.findScheduledMessageById(messageId);
            message = {
                messageTime: message.messageTime,
                message: message.message,
            }
            messageController.savePermanentMessage(message);//save message permanently
            view.deleteScheduledMessage([new Types.ObjectId(messageId)])// delete message from scheduled message
        } catch (error) {
            throw error;
        }
    }


    async sendTempMessageToPermanentMessage() {
        try {
            let messageBody: any = [];
            let scheduledMessage = await view.getPermanentMessage()
            if (scheduledMessage.length)
                messageBody = scheduledMessage.map((ele: any) => {
                    return {
                        message: ele.message,
                        messageTime: ele.messageTime,
                        _id: ele._id
                    }
                })
            messageController.savePermanentMessage(messageBody) // move scheduled message to permanent message
            if (messageBody.length) view.deleteScheduledMessage(messageBody) // delete scheduled message
        } catch (error) {
            throw error;
        }
    }
}
export const messageController = new Message()