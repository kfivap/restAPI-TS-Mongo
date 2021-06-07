import {Express, Request, Response} from 'express'
import {createUserHandler,} from "./controller/user.controller";
import {createUserSessionHandler, invalidateUserSessionHandler, getUserSessionHandler} from "./controller/session.controller";
import {validateRequest, requiresUser} from './middleware'
import {createUserSchema,
    createUserSessionSchema
} from './schemas/user.schema'
import {createPostSchema} from "./schemas/post.schema";
import {createPostHandler, deletePostHandler, getPostHandler, updatePostHandler} from "./controller/post.controller";
import {createCommentHandler} from "./controller/comment.controller";
import {createCommentSchema} from "./schemas/comment.schema";

export default function (app: Express) {
    app.get('/healthcheck', (req: Request, res: Response)=>{
        res.sendStatus(200)
    })

    // Register user
    app.post('/api/users', validateRequest(createUserSchema), createUserHandler)


    // Login
    app.post('/api/sessions',
        validateRequest(createUserSessionSchema),
        createUserSessionHandler
    )



    // Get the user`s sessions
    app.get('/api/sessions', requiresUser, getUserSessionHandler)


    // Logout
    app.delete('/api/sessions', requiresUser, invalidateUserSessionHandler)




    // Create a post
    app.post('/api/posts',
        [requiresUser, validateRequest(createPostSchema)],
        createPostHandler
        )
    // Update a post
    app.put('/api/posts',
        [requiresUser, validateRequest(createPostSchema)],
        updatePostHandler
    )
    // Get a post
    app.get('/api/posts/:postId', getPostHandler)
    // Delete a post
    app.delete('/api/posts',
        [requiresUser, validateRequest(createPostSchema)],
        deletePostHandler)





    // Create a comment
    app.post('/api/comments',
        [requiresUser, validateRequest(createCommentSchema)],
        createCommentHandler

        )

    /* Not created yet

    // Update a comment
    app.put('/api/comments',
        [requiresUser, validateRequest(createPostSchema)],
        updatePostHandler
    )
    // Get a comment
    app.get('/api/comments/:commentId', getPostHandler)

    // Delete a comment
    app.delete('/api/comments',
        [requiresUser, validateRequest(createPostSchema)],
        deletePostHandler)


     */
}