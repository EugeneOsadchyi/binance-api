import WebsocketBase from '../../lib/websocket/base';

const PRODUCTION_URL = 'wss://stream.binance.com';
const TESTNET_URL = 'wss://testnet.binance.vision';

export interface BinanceWebsocketOptions {
  baseURL?: string;
  isTestnet?: boolean;
}

export default abstract class BinanceWebsocketBase extends WebsocketBase {
  private isTestnet: boolean;
  private baseURL: string | null;

  constructor(options: BinanceWebsocketOptions = {}) {
    super();

    this.isTestnet = options.isTestnet || false;
    this.baseURL = options.baseURL || null;
  }

  protected getBaseURL() {
    return (this.baseURL || (this.isTestnet ? this.getTestnetURL() : this.getProductionURL()));
  }

  protected getProductionURL() {
    return PRODUCTION_URL;
  }

  protected getTestnetURL() {
    return TESTNET_URL;
  }
}
