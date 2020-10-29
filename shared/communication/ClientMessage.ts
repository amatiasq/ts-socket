import { Message } from './Message';

export enum ClientMessageType {
  ERROR = 'ERROR',
}

interface ClientMessage__ERROR extends Message<ClientMessageType> {
  type: ClientMessageType.ERROR;
  data: {
    message: string;
  };
}

export type ClientMessage = ClientMessage__ERROR;
