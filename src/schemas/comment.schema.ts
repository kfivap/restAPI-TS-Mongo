import { object, string, ref } from "yup";

const payload = {
    body: object({
        title: string().required("Title is required"),
        body: string()
            .required("Body is required")
            .min(5, "Body is too short - should be 5 chars minimum."),
    }),
};

const params = {
    params: object({
        commentId: string().required("postId is required"),
    }),
};

export const createCommentSchema = object({
    ...payload,
});

export const updateCommentSchema = object({
    ...params,
    ...payload,
});

export const deleteCommentSchema = object({
    ...params,
});