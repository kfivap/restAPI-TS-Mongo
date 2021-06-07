import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";

const requiresUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try{
        const user = get(req, "user");

        if (!user) {
            // return res.sendStatus(403);
        throw new HttpException(403, "Auth Error")
        }

        return next();
    } catch (e) {
        next(e)
    }

};

export default requiresUser;