import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
} from "mongoose";
import Comment, {CommentDocument} from "../model/comment.model";

export function createComment(input: DocumentDefinition<CommentDocument>) {
    return Comment.create(input);
}

export function findComment(
    query: FilterQuery<CommentDocument>,
    options: QueryOptions = { lean: true }
) {
    // console.log(query)
    return Comment.findOne(query, {}, options);
}

export function findAndUpdate(
    query: FilterQuery<CommentDocument>,
    update: UpdateQuery<CommentDocument>,
    options: QueryOptions
) {
    return Comment.findOneAndUpdate(query, update, options);
}


export function deleteComment(query: FilterQuery<CommentDocument>) {
    console.log(query)
    return Comment.deleteOne(query);
}