import WebSocket from 'ws';
import { EventEmitter } from 'events';

interface WebSocketBase {
  on(event: 'open', listener: () => void): this;
  on(event: 'close', listener: (code: number, reason: Buffer) => void): this;
  on(event: 'error', listener: (error: Error) => void): this;
  on(event: 'message', listener: (message: unknown) => void): this;
}

abstract class WebSocketBase extends EventEmitter {
  protected ws?: WebSocket;
  protected reconnectInterval = 500;
  protected reconnectAttempts = 3;
  protected reconnectCount = 0;

  protected CONNECTION_CLOSED_BY_APP = 4000;

  public abstract getBaseURL(): string;

  protected connect() {
    this.ws = new WebSocket(this.getBaseURL());

    this.ws.on('open', this.onOpen.bind(this));
    this.ws.on('close', this.onClose.bind(this));
    this.ws.on('error', this.onError.bind(this));
    this.ws.on('message', this.onMessage.bind(this));
    this.ws.on('ping', this.onPing.bind(this));
  }

  protected disconnect() {
    this.close();
  }

  public close() {
    if (!this.ws) return;

    this.ws.close(this.CONNECTION_CLOSED_BY_APP);
    this.ws = undefined;
  }

  protected sendMessage(message: unknown) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      setTimeout(() => {
        this.sendMessage(message);
      }, 100);

      return;
    }

    this.ws.send(JSON.stringify(message));
  }

  protected onOpen() {
    this.emit('open');
    this.reconnectCount = 0;
  }

  protected onClose(code: number, reason: Buffer) {
    this.emit('close', code, reason.toString());

    if (code === this.CONNECTION_CLOSED_BY_APP) return;

    if (this.reconnectCount < this.reconnectAttempts) {
      this.reconnectCount++;

      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    }
  }

  protected onError(error: Error) {
    this.emit('error', error);
  }

  protected onMessage(data: WebSocket.RawData) {
    const json = JSON.parse(data.toString());
    this.emit('message', json);
    return json;
  }

  protected onPing() {
    if (!this.ws) {
      throw new Error('Calling onPing with no websocket');
    }

    this.ws.ping();
  }
}

export default WebSocketBase;
