import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";
import {PostDocument} from "./post.model";

export interface CommentDocument extends mongoose.Document {
    user: UserDocument["_id"];
    post: PostDocument["_id"];
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new mongoose.Schema(
    {
        commentId: {
            type: String,
            required: true,
            unique: true,
            default: () => nanoid(10),
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true },
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
        body: { type: String, default: true },

    },
    { timestamps: true }
);

const Comment = mongoose.model<CommentDocument>("Comment", CommentSchema);

export default Comment;