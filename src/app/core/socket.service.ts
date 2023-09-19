import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  public emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  public on(event: string, callback: Function): void {
    this.socket.on(event, callback);
  }

  public disconnect(): void {
    this.socket.disconnect();
  }
}
