import { Message } from './Message';

export enum ServerMessageType {
  ERROR = 'ERROR',
  HANDSHAKE = 'HANDSHAKE',
}

interface ServerMessage__ERROR extends Message<ServerMessageType> {
  type: ServerMessageType.ERROR;
  data: {
    message: string;
  };
}

interface ServerMessage__HANDSHAKE extends Message<ServerMessageType> {
  type: ServerMessageType.HANDSHAKE;
}

export type ServerMessage = ServerMessage__ERROR | ServerMessage__HANDSHAKE;
