import { CPU_UT_TIMER, COUNTER_AMT } from '../constant/constant'
// let os = require('os');
const os = require('os-utils');
class CpuUtilization {
    constructor() {
    }
    async resetCounter(client: any) {
        try {
            os.cpuUsage(function (v: any) {
                if (v > 70) {
                    //set the cron here to restart the server
                }
            });
            client.setex(CPU_UT_TIMER, COUNTER_AMT, JSON.stringify({ type: CPU_UT_TIMER }));
        } catch (error) {
            throw error
        }
    }
}
export const cpuUtilization = new CpuUtilization()
