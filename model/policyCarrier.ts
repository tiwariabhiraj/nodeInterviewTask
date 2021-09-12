"use strict";

import * as mongoose from "mongoose";
import { Schema, Model, Document, Types } from "mongoose"

export interface PolicyCarrier {
    company_name: string,
    company_id: string
}

const policyCarrierSchema = new Schema({
    company_name: { type: String, required: true },
    // company_id: { type: Types.ObjectId, required: true },
}, {
    versionKey: false,
    timestamps: true
});

export const policy_carrier: Model<PolicyCarrier> = mongoose.model<PolicyCarrier>('policy_carrier', policyCarrierSchema);