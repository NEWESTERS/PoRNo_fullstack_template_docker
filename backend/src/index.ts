import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import { User } from './entity/User';
import { router, secureRouter } from './controllers';

const server = express();
const PORT = process.env.PORT;
const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [ User ],
    synchronize: process.env.NODE_ENV === "dev",
}).then(async () => {
    console.log("Database connected");

    server.use(cors());
    server.use(express.static(CLIENT_BUILD_PATH));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    server.use('/api', router);
    server.use('/api', secureRouter);

    server.get('*', (request, response) => {
        response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'))
    });

    server.listen(PORT, () => console.log(`Backend running on ${PORT}`));

}).catch(error => console.error(error));
