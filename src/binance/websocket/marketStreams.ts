import WebSocketBase from '../../lib/websocket/base';

const PRODUCTION_URL = 'wss://stream.binance.com:9443/ws';
const TESTNET_URL = 'wss://testnet.binance.vision/ws';

interface StreamListSubscriptionsPayload {
  method: 'LIST_SUBSCRIPTIONS';
  id: number;
}

interface StreamSubscriptionPayload {
  method: 'SUBSCRIBE' | 'UNSUBSCRIBE';
  params: string[];
  id: number;
}

type StreamPayload = StreamListSubscriptionsPayload | StreamSubscriptionPayload;

export default class MarketStreams extends WebSocketBase {
  private websocketId = 0;
  private subscriptions: Set<string> = new Set();
  private websocketMessageIdToSubscription: Map<number, StreamPayload> = new Map();

  private isTestnet: boolean;

  constructor(isTestnet = false) {
    super();

    this.isTestnet = isTestnet;
  }

  public getBaseURL() {
    return this.isTestnet ? TESTNET_URL : PRODUCTION_URL;
  }

  public subscribe(path: string) {
    if (!this.ws) this.connect();
    if (this.subscriptions.has(path)) return;

    const payload: StreamPayload = { method: 'SUBSCRIBE', params: [path], id: ++this.websocketId };

    this.websocketMessageIdToSubscription.set(this.websocketId, payload);

    this.sendMessage(payload);
  }

  public unsubscribe(path: string) {
    if (!this.ws) return;
    if (!this.subscriptions.delete(path)) return;

    const payload: StreamPayload = { method: 'UNSUBSCRIBE', params: [path], id: ++this.websocketId };

    this.websocketMessageIdToSubscription.set(this.websocketId, payload);

    this.sendMessage(payload);

    if (this.subscriptions.size === 0) {
      this.disconnect();
    }
  }

  public listSubscriptions() {
    if (!this.ws) return [];

    const payload: StreamPayload = { method: 'LIST_SUBSCRIPTIONS', id: ++this.websocketId };
    this.websocketMessageIdToSubscription.set(this.websocketId, payload);

    this.sendMessage(payload);
  }

  protected onOpen() {
    super.onOpen();

    this.subscriptions.forEach((path) => {
      this.sendMessage({ method: 'SUBSCRIBE', params: [path], id: ++this.websocketId });
    });
  }

  protected onMessage(message: Buffer) {
    const json = super.onMessage(message);

    if (json.id && json.result === null) {
      const subscription = this.websocketMessageIdToSubscription.get(json.id);

      if (subscription) {
        this.websocketMessageIdToSubscription.delete(json.id);

        if (subscription.method === 'SUBSCRIBE') {
          this.subscriptions.add(subscription.params[0]);
        } else if (subscription.method === 'UNSUBSCRIBE') {
          this.subscriptions.delete(subscription.params[0]);
        } else if (subscription.method === 'LIST_SUBSCRIPTIONS') {
          this.subscriptions = new Set(json.result);
        }
      }
    }
  }

  protected onClose(code: number, reason: Buffer) {
    super.onClose(code, reason);

    if (code === this.CONNECTION_CLOSED_BY_APP) {
      this.subscriptions.clear();
      this.websocketMessageIdToSubscription.clear();
    }
  }
}
