import WebSocket from 'ws';
import { EventEmitter } from 'events';

export default abstract class WebSocketBase extends EventEmitter {
  protected ws?: WebSocket;
  protected reconnectInterval: number = 500;
  protected reconnectAttempts: number = 3;
  protected reconnectCount: number = 0;

  protected CONNECTION_CLOSED_BY_APP: number = 4000;

  public abstract getBaseURL(): string

  protected connect() {
    this.ws = new WebSocket(this.getBaseURL());

    this.ws.on('open', this.onOpen.bind(this));
    this.ws.on('close', this.onClose.bind(this));
    this.ws.on('error', this.onError.bind(this));
    this.ws.on('message', this.onMessage.bind(this));
    this.ws.on('ping', this.onPing.bind(this));

    process.on('SIGINT', () => this.close());
    process.on('SIGTERM', () => this.close());
  }

  protected disconnect() {
    this.close();
  }

  public close() {
    if (!this.ws) return;

    this.ws.close(this.CONNECTION_CLOSED_BY_APP);
    this.ws = undefined;
  }

  protected sendMessage(message: any) {
    if (this.ws && this.ws.readyState !== WebSocket.OPEN) {
      setTimeout(() => {
        this.sendMessage(message);
      }, 100);

      return;
    }

    this.ws!.send(JSON.stringify(message));
  }

  protected onOpen() {
    this.emit('open');
    this.reconnectCount = 0;
  }

  protected onClose(code: number, reason: Buffer) {
    console.log('WebSocket closed', code, reason.toString());
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
    this.ws!.ping();
  }
}
