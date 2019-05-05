import { Router, Request, Response, NextFunction } from 'express';
import { sign, verify, VerifyErrors } from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import { compare } from 'bcrypt';

import { User } from '../entity/User';

const authRouter = Router();

authRouter.use('/', authenticate);

export { authRouter, verifyToken, getUserInfo };

async function authenticate(request: Request, response: Response) {
    try {
        const user = await getConnection()
            .createQueryBuilder()
            .select("user")
            .from(User, "user")
            .where("user.login = :login", { login: request.body.login })
            .getOne();

        if(user !== undefined) {
            const match = await compare(request.body.password, user.passwordHash);

            if(match){
                const userInfo: UserInfo = { 
                        login: user.login
                    },
                    token = sign(userInfo, process.env.SECRET!, { expiresIn: "1d" });

                response.status(200).send({
                    ...userInfo,
                    token: token
                });
            } else {
                response.status(403).send("Incorrect password");
            }
        } else {
            response.status(403).send("User not found");
        }
    } catch(error) {
        response.status(400).send(error.message);
        console.log(error.message);
    }
}

function verifyToken(request: Request, response: Response, next: NextFunction) {
    const token = request.body.token || request.query.token || request.headers['x-access-token'];

    if(token) {
        verify(token, process.env.SECRET!, (error: VerifyErrors, userInfo: UserInfo) => {
            if(error) {
                response.status(403).send("Failed to autheticate token");                
            } else {
                request.app.locals.userInfo = userInfo;
                next();
            }            
        })
    } else {
        response.status(400).send("No token provided");
    }
}

interface UserInfo {
    login: string
}

function getUserInfo(request: Request): UserInfo {
    return request.app.locals.userInfo;
};