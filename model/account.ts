"use strict";

import * as mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose"

export interface Account {
    account_name: string
}

const accountSchema = new Schema({
    account_name: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

export const account: Model<Account> = mongoose.model<Account>('account', accountSchema);