"use strict";

import * as mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose"

export interface ScheduledMessage {
    message: string;
    messageTime: string;
    expireTime: number;
}

const ScheduledMessageSchema = new Schema({
    messageTime: { type: String, required: true },
    message: { type: String, required: true },
    expireTime: { type: Number, required: false }
}, {
    versionKey: false,
    timestamps: true
});

export const scheduled_message: Model<ScheduledMessage> = mongoose.model<ScheduledMessage>('scheduled_message', ScheduledMessageSchema);