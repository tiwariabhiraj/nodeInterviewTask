"use strict";

import * as mongoose from "mongoose";
import { Schema, Model, Document, Types } from "mongoose"

export interface User {
    firstname: string,
    dob: string,
    address: string,
    phoneNumber: string,
    zip: string,
    email: string,
    gender: string,
    userType: string
}

const userSchema = new Schema({
    firstname: { type: String, required: false },
    dob: { type: String, required: false },
    address: { type: String, required: false },
    phone: { type: String, required: false },
    zip: { type: String, required: false },
    email: { type: String, required: false },
    gender: { type: String, required: false },
    userType: { type: String, required: false },
    // userId: { type: Types.ObjectId, required: true }
}, {
    versionKey: false,
    timestamps: true
});

// Export user
export const users: Model<User> = mongoose.model<User>('users', userSchema);