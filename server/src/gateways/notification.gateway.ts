import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MaterialUnion } from '@shared/types';
import { Server } from 'socket.io';

@WebSocketGateway(3333, {
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNewMaterialNotification(material: MaterialUnion) {
    this.server.emit('newMaterialNotification', material);
  }
}
