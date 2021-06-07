import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.util";
import { reIssueAccessToken } from "../service/session.service";
import HttpException from "../exceptions/HttpException";

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const accessToken = get(req, "headers.authorization", "").replace(
            /^Bearer\s/,
            ""
        );


        const refreshToken = get(req, "headers.x-refresh");

        if (!accessToken){
            console.log('accessToken', accessToken)
             throw new HttpException(403, "could not get access token")
            // return next();
        }

        const { decoded, expired, errMessage } = decode(accessToken);
        if(!decoded){
            throw new HttpException(401, errMessage)
        }
        if (decoded) {
            // @ts-ignore
            req.user = decoded;
            return next();
        }

        if (expired && refreshToken) {
            const newAccessToken = await reIssueAccessToken({ refreshToken });

            if (newAccessToken) {
                // Add the new access token to the response header
                res.setHeader("x-access-token", newAccessToken);

                const { decoded } = decode(newAccessToken);

                // @ts-ignore
                req.user = decoded;
            }

            return next();
        }

        return next();
    } catch (e) {
        // console.log(e)
        next(e)
    }

};

export default deserializeUser;