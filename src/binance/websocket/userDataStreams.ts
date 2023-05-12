import WebSocketBase from '../../lib/websocket/base';
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
    this.connect();
  }

  public unsubscribe() {
    this.listenKey = undefined;
    this.disconnect();
  }

  private scheduleAutoRenewListenKey() {
    this.listenKeyRenewInterval = setInterval(async () => {
      if (!this.listenKey) {
        throw new Error('listenKey is not set, but auto renew was scheduled');
      }

      await this.binanceSpotClient.userDataStream.keepAliveListenKey(this.listenKey);
    }, LISTEN_KEY_RENEW_INTERVAL);
  }

  private clearAutoRenewListenKey(): void {
    if (!this.listenKeyRenewInterval) return;

    clearInterval(this.listenKeyRenewInterval);

    this.listenKeyRenewInterval = undefined;
  }

  protected onOpen() {
    super.onOpen();
    this.scheduleAutoRenewListenKey();
  }

  protected onClose(code: number, reason: Buffer): void {
    this.clearAutoRenewListenKey();
    super.onClose(code, reason);
  }
}
