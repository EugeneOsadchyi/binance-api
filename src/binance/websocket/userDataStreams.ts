import BinanceWebsocketBase, { BinanceWebsocketOptions } from './base';
import Spot from '../api/spot';

const LISTEN_KEY_RENEW_INTERVAL = 1000 * 60 * 30;

export default class UserDataStreams extends BinanceWebsocketBase {
  public binanceSpotClient: Spot;
  private listenKeyRenewInterval?: NodeJS.Timeout;
  private listenKey?: string;

  constructor(binanceSpotClient: Spot, options?: BinanceWebsocketOptions) {
    super(options);

    this.binanceSpotClient = binanceSpotClient;
  }

  public getBaseURL(): string {
    return super.getBaseURL() + '/ws/' + this.listenKey;
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
