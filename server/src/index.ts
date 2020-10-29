import { createServer } from 'http';
import { Server } from 'ws';

import { ClientMessage } from '../../shared/communication/ClientMessage';
import {
  ServerMessage,
  ServerMessageType,
} from '../../shared/communication/ServerMessage';
import { DEFAULT_PORT } from '../../shared/config.json';
import { parseJson } from '../../shared/parseJson';

let lastId = 0;

const port = process.env.PORT || DEFAULT_PORT;
const server = createServer();
const wss = new Server({ server });

server.listen(port, () => console.log(`Websocket server ready at ${port}`));

wss.on('connection', (ws, req) => {
  const id = ++lastId;

  console.log(`${id} connected`);

  ws.on('close', () => console.log(`${id} disconnected`));

  ws.on('message', msg => {
    const data = parseJson(msg as string) as ClientMessage;
    console.log(`${id} sent message`, data);
  });

  send({ type: ServerMessageType.HANDSHAKE });

  function send(data: ServerMessage) {
    console.log(`send to ${id}`, data);
    ws.send(JSON.stringify(data));
  }
});
