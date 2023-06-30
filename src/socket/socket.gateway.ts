import type { Socket } from 'socket.io';
import type http from 'http';

import { Server } from 'socket.io';

import server from '#/server';
import { RedisService } from '#/services/redis.service';

export class SocketGateway {
  private _socket: Server;
  private _redisService = new RedisService();

  constructor(webServer: http.Server) {
    this._socket = new Server(webServer, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });
    console.log('\x1b[35m%s\x1b[0m', '\n🔌 Socket.IO connected \n');

    server.redis.clear();

    this._socket.on('connection', this.handleConnection);
    this._socket.on('disconnect', this.handleDisconnect);
  }

  get socket(): Server {
    return this._socket;
  }

  async handleConnection(socket: Socket) {
    try {
      this._redisService.add('unknown', socket.id);

      // const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
      // // const player: PlayersI = await this.playersService.findPlayerBySteamId64(
      // //   decodedToken.steamid64
      // // );
      // if (!player) return this.disconnect(socket);
      // this.rediskaService.add(player.id, socket.id);
      // socket.data.player = player;
      // socket.join(`uid${player.id}`);
      // // *Redis
      // const allPlayerConnection = await this.rediskaService.getAll(player.id);
      // socket.data.sockets = allPlayerConnection;
      // allPlayerConnection.forEach((socketSync) => {
      //   this.server.sockets.sockets.get(socketSync).data.sockets = allPlayerConnection;
      // });

      return this.socket.to(socket.id).emit('connected');
    } catch (e) {
      return socket.disconnect();
    }
  }

  async handleDisconnect(socket: Socket) {
    this._redisService.remove('unknown', socket.id);

    // if (!this.socket.data?.player?.id) return;

    // *Redis
    // await this.rediskaService.remove(socket.data.player.id, socket.id);
    // const isLastConnect = await this.rediskaService.ammount(socket.data.player.id);

    socket.disconnect();
  }
}
