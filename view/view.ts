import { Types } from "mongoose";
import { users, agents, account, policy_carrier, policy_category, policy_info, scheduled_message, message } from "../model/index"
import { client } from "../redis";

class View {

    async insertUserData(data: any) {
        try {
            return await users.create(data)
        } catch (error) {
            throw error;
        }
    }
    async insertAccountData(data: any) {
        try {
            account.create(data, (data1: any, data2: any) => {
                console.log('data updated', data2);
            })
        } catch (error) {
            throw error;
        }
    }
    async insertAgentData(data: any) {
        try {

            agents.create(data, (data1: any, data2: any) => {
                console.log('data updated', data2);
            })
        } catch (error) {
            throw error;
        }
    }
    async insertPolicyCarrierData(data: any) {
        try {
            return await policy_carrier.create(data)
        } catch (error) {
            throw error;
        }
    }
    async insertpolicyCategoryData(data: any) {
        try {
            policy_category.create(data, (data1: any, data2: any) => {
                console.log('data updated', data2);
            })
        } catch (error) {
            throw error;
        }
    }
    async insertPolicyInfoData(data: any) {
        try {

            policy_info.create(data, (data1: any, data2: any) => {
                console.log('data updated', data2);
            })
        } catch (error) {
            throw error;
        }
    }

    async searchPolicyInfo(userName: string) {
        try {
            let match: any = {
                firstname: { "$regex": userName, "$options": "-i" }
            }
            let aggPipe: any = []
            aggPipe.push({ $match: match });
            let lookup: any = {
                from: "policy_infos",
                localField: "_id",
                foreignField: "userId",
                as: "policyInfo"
            }
            aggPipe.push({ $lookup: lookup })
            let options = { lean: true }
            return await users.aggregate(aggPipe, options)
        } catch (error) {
            throw error;
        }
    }

    async aggregatePolicyOfUser() {
        try {
            let aggPipe: any = []
            let lookup: any = {
                from: "policy_infos",
                localField: "_id",
                foreignField: "userId",
                as: "policyInfo"
            }
            aggPipe.push({ $lookup: lookup })
            let options = { lean: true }
            return await users.aggregate(aggPipe, options)
        } catch (error) {
            throw error;
        }
    }

    async saveScheduledMessage(params: any) {
        try {
            return await scheduled_message.create(params);
        } catch (error) {
            throw error;
        }
    }
    async savePermanentMessage(params: any) {
        try {
            return await message.create(params);
        } catch (error) {
            throw error;
        }
    }
    async findScheduledMessageById(messageId: any) {
        try {
            let match: any = {
                _id: new Types.ObjectId(messageId)
            }
            return await scheduled_message.findOne(match)
        } catch (error) {
            throw error;
        }
    }
    async deleteScheduledMessage(messageArray: any) {
        try {
            messageArray = messageArray.map((ele: any) => {
                return ele._id
            })
            let match = {
                _id: { $in: messageArray }
            }
            return await scheduled_message.deleteMany(match)
        } catch (error) {
            throw error;
        }
    }

    async getPermanentMessage() {
        try {
            let match = {
                expireTime: { $lte: new Date().getTime() }
            }
            return await scheduled_message.find(match);
        } catch (error) {
            throw error;
        }
    }

    async saveScheduledMessageToRedis(messageId: any, timer: number) {
        try {
            console.log(messageId, timer);
            timer = 5;
            let ounterKey = {
                type: 'scheduled_messgae',
                _id: messageId
            }
            return client.setex(JSON.stringify(ounterKey), timer, JSON.stringify({ type: "timer" }));
        } catch (error) {
            throw error;
        }
    }

}
export const view = new View()