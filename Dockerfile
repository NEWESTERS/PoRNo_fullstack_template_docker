# Setup and build the client
FROM node:carbon as frontend

WORKDIR /usr/app/frontend/
COPY frontend/ ./
RUN npm install -qy

RUN npm run build

# Setup the server
FROM node:carbon

WORKDIR /usr/app/
COPY --from=frontend /usr/app/frontend/build/ ./frontend/build/

WORKDIR /usr/app/backend/
COPY backend/ ./
RUN npm install -qy

CMD ["npm", "start"]