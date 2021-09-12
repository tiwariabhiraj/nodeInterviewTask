"use strict";

import * as mongoose from "mongoose";
import { Schema, Model, Document } from "mongoose"

export interface PolicyCategory {
    category_name: string
}

const policyCategorySchema = new Schema({
    category_name: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

export const policy_category: Model<PolicyCategory> = mongoose.model<PolicyCategory>('policy_category', policyCategorySchema);