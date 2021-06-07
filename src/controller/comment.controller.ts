import {NextFunction, Request, Response} from "express";
import { get } from "lodash";

import {createComment, findComment, findAndUpdate, deleteComment} from "../service/comment.service";
import HttpException from "../exceptions/HttpException";

export async function createCommentHandler(req: Request, res: Response, next: NextFunction) {
    try{

        const userId = get(req, "user._id");
        console.log('userId', userId)

        const body = req.body;

        const comment = await createComment({ ...body, user: userId, post:body.postId });

        return res.send({comment});
    } catch (e) {
        next(e)
    }

}

export async function updateCommentHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const commentId = get(req, "body.commentId");
    // console.log(commentId)
    const update = req.body;

    const comment = await findComment({ commentId });

    if (!comment) {
        return res.status(404).json('not found');
    }

    if (String(comment.user) !== userId) {
        return res.sendStatus(401);
    }

    const updatedComment = await findAndUpdate({ commentId }, update, { new: true });

    return res.send(updatedComment);
}
export async function getCommentHandler(req: Request, res: Response) {
    const commentId = get(req, "params.commentId");
    console.log(commentId)
    const comment = await findComment({ commentId });

    if (!comment) {
        return res.sendStatus(404);
    }

    return res.send(comment);
}

export async function deleteCommentHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const commentId = get(req, "query.commentId");

    const comment = await findComment({ commentId });

    if (!comment) {
        return res.sendStatus(404);
    }

    console.log(comment.user)
    console.log(userId)
    if (String(comment.user) !== String(userId)) {
        return res.sendStatus(401);
    }

    await deleteComment({ commentId });

    return res.sendStatus(200);
}