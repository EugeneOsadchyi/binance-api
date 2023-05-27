import Base from '../base';
import type { SpotExchangeInfo } from './types';

const PRODUCTION_URL = 'https://data-api.binance.vision';

export default class Market extends Base {
  protected getProductionURL() {
    return PRODUCTION_URL;
  }

  public getExchangeInfo(): Promise<SpotExchangeInfo> {
    return this.request('GET', '/api/v3/exchangeInfo');
  }
}
