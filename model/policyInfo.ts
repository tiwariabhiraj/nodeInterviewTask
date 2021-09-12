"use strict";

import * as mongoose from "mongoose";
import { Schema, Model, Document, Types } from "mongoose"

export interface PolicyInfo {
    policy_number: string,
    policy_start_date: string,
    policy_end_date: string,
    policy_category: string,
    company_id: string,
    userId: string
}
const policyInfoSchema = new Schema({
    policy_number: { type: String, required: false },
    policy_start_date: { type: String, required: false },
    policy_end_date: { type: String, required: false },
    policy_category: { type: String, required: false },
    company_id: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, required: true },
}, {
    versionKey: false,
    timestamps: true
});

export const policy_info: Model<PolicyInfo> = mongoose.model<PolicyInfo>('policy_info', policyInfoSchema);