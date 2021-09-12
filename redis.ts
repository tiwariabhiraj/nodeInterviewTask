import { cpuUtilization } from "./cpuUtilization/utilization"
import { CPU_UT_TIMER, REDIS } from "./constant/constant"
import { messageController } from "./controller/messageController"
export let client: any;
export class RedisClient {
    constructor(redis: any) {
        this.init(redis)
    }

    async init(redis: any) {
        try {
            const CONF = { db: 0 };
            client = redis.createClient(REDIS.PORT, REDIS.HOST, CONF, { disable_resubscribing: true });
            let subscriber = redis.createClient(REDIS.PORT, REDIS.HOST, CONF, { disable_resubscribing: true })
            client.on("ready", () => {
                cpuUtilization.resetCounter(client)
                console.log('redis server running');
            });
            client.on("error", (error: any) => {
                console.log("Error in Redis", error);
            });
            subscriber.subscribe('__keyevent@0__:expired', (err: any, data: any) => {
                console.log("subscribe====>", data);
            })
            subscriber.on("message", async (channel: any, message: any, data: any) => {
                try {
                    let data = JSON.parse(message);
                    if (data.type == 'scheduled_messgae') {
                        messageController.fetchScheduledMessage(data._id);
                    }
                } catch (error) {
                    if (message == CPU_UT_TIMER) {
                        cpuUtilization.resetCounter(client);
                    }
                }
            })
            return subscriber
        } catch (error) {
            throw error
        }
    }
}

