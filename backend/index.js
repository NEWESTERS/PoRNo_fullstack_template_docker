const express = require('express'),
    { Pool } = require('pg'),
    cors = require('cors'),
    path = require('path');

const server = express();
const PORT = process.env.PORT;
const CLIENT_BUILD_PATH = path.join(__dirname, '../frontend/build');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

server.use(cors());
server.use(express.static(CLIENT_BUILD_PATH));

server.get('/api/now', (request, response) => {
    pool.query('SELECT NOW()', (err, res) => {
        response.status(200).json(res.rows);       
    })
});

server.get('*', (request, response) => {
    response.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'))
});

server.listen(PORT, () => console.log(`Backend running on ${PORT}`));