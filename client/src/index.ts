import { ResilientSocket } from '@amatiasq/resilient-socket';

import { ClientMessage } from '../../shared/communication/ClientMessage';
import { ServerMessage } from '../../shared/communication/ServerMessage';
import { DEFAULT_PORT } from '../../shared/config.json';
import { parseJson } from '../../shared/parseJson';

let FORCE_PROD_SERVER = false;
// FORCE_PROD_SERVER = true;

const serverUri =
  location.origin === 'https://amatiasq.github.io' || FORCE_PROD_SERVER
    ? 'wss://ts-socket.amatiasq.com'
    : `ws://localhost:${DEFAULT_PORT}`;

const socket = openSocket(serverUri);

function openSocket(uri: string) {
  const socket = new ResilientSocket(uri);

  socket.onOpen(event => console.log('Socket open'));
  socket.onClose(event => console.log('Socket closed'));
  socket.onError(event => console.log('Reconnection failed'));

  socket.onReconnect(event => {
    const time = Date.now() - Number(event.disconnectedTime);
    console.log(`Disconnected for ${time} milliseconds`);
  });

  socket.onMessage(event => {
    const data = parseJson(event.data) as ServerMessage;
    console.log('received', data);
  });

  return socket;
}

function send(message: ClientMessage) {
  console.log('sending', message);
  socket.send(JSON.stringify(message));
}
