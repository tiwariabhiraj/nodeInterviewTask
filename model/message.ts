"use strict";

import { number } from "joi";
import * as mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose"

export interface Message {
    messageTime: string;
    time: string;
    day: string;
}

const messageSchema = new Schema({
    messageTime: { type: String, required: true },
    message: { type: String, required: true },
    created: { type: Number, required: false, default: Date.now }
}, {
    versionKey: false,
    timestamps: true
});

export const message: Model<Message> = mongoose.model<Message>('message', messageSchema);