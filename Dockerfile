# Setup and build the client
FROM node:carbon as frontend

WORKDIR /usr/app/frontend/
COPY frontend/package*.json ./
RUN npm install -qy
COPY frontend/ ./
RUN npm run build

# Setup the server
FROM node:carbon

WORKDIR /usr/app/
COPY --from=frontend /usr/app/frontend/build/ ./frontend/build/

WORKDIR /usr/app/backend/
COPY server/package*.json ./
RUN npm install -qy
COPY backend/ ./

CMD ["npm", "start"]