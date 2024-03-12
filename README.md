## How to use Redis as a Pub/Sub system with NestJS

### How to run ?
First run the Redis server with the following command:

```bash
cd ./docker && docker compose up -d
```

Then run both NestJS applications with the following commands:

```bash
npm run start:dev
```

Publisher runs on port __3000__ and subscriber runs on port __3001__.

Publisher exposes a POST endpoint at http://localhost:3000/ and subscriber listens to the channel __events__.

Subscriber exposes: 
- Socket.IO server at http://localhost:3001/ which emits the received message to the client.
- SSE route at http://localhost:3001/sse which sends the received message to the client.
