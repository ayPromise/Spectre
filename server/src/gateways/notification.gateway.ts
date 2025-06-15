import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MaterialUnion } from '@shared/types';
import { Server } from 'socket.io';
import { Schedule } from 'src/schedule/schema/schedule.schema';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  sendNewNotification(
    data: MaterialUnion | Schedule,
    type: 'material' | 'schedule',
    action: 'edit' | 'create',
  ) {
    this.server.emit('newNotification', {
      data,
      type,
      action,
      isRead: false,
    });
  }
}
