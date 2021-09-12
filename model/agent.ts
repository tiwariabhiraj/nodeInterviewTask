"use strict";

import * as mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose"

export interface Agent {
    agent: string
}

const agentSchema = new Schema({
    agent: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

export const agents: Model<Agent> = mongoose.model<Agent>('agents', agentSchema);