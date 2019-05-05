import { getConnection } from 'typeorm';
import { Router, Request, Response } from 'express';

const exampleRouter = Router(),
    exampleSecureRouter = Router();

exampleRouter.get('/now', getDoctorsMethod);

export { exampleRouter, exampleSecureRouter };

async function getDoctorsMethod(request: Request, response: Response) {
    try {
        const now = await getConnection()
            .query('SELECT NOW()');

        response.status(200).send(now);
    } catch(error) {
        response.status(400).send(error.message)
    }
}