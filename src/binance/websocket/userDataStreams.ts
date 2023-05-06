import WebSocketBase from './base';
import Spot from '../api/spot';

const PRODUCTION_URL = 'wss://stream.binance.com:9443/ws';
const TESTNET_URL = 'wss://testnet.binance.vision/ws';

const LISTEN_KEY_RENEW_INTERVAL = 1000 * 60 * 30;

export default class UserDataStreams extends WebSocketBase {
  public isTestnet: boolean = false;
  public binanceSpotClient: Spot;
  private listenKeyRenewInterval?: NodeJS.Timeout;
  private listenKey?: string;

  constructor(binanceSpotClient: Spot, isTestnet = false) {
    super();

    this.binanceSpotClient = binanceSpotClient;
    this.isTestnet = isTestnet;
  }

  public getBaseURL(): string {
    return (this.isTestnet ? TESTNET_URL : PRODUCTION_URL) + '/' + this.listenKey;
  }

  public async subscribe() {
    const { listenKey } = await this.binanceSpotClient.userDataStream.createListenKey();
    this.listenKey = listenKey;

    this.scheduleAutoRenewListenKey();

    super.connect();
  }

  public unsubscribe() {
    this.listenKey = undefined;

    if (this.listenKeyRenewInterval) {
      clearInterval(this.listenKeyRenewInterval);

      this.listenKeyRenewInterval = undefined;
    }

    this.disconnect();
  }

  private scheduleAutoRenewListenKey() {
    this.listenKeyRenewInterval = setInterval(async () => {
      await this.binanceSpotClient.userDataStream.keepAliveListenKey(this.listenKey!);
      this.updateListenKey(this.listenKey!);
    }, LISTEN_KEY_RENEW_INTERVAL);
  }

  private updateListenKey(listenKey: string) {
    this.listenKey = listenKey;
    this.reconnect();
  }

  private reconnect() {
    this.close();
    this.connect();
  }

  protected onClose(code: number, reason: Buffer): void {
    super.onClose(code, reason);

    if (code === this.CONNECTION_CLOSED_BY_APP) return;
  }
}
