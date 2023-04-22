import Base from '../../base';
import type { SpotExchangeInfo } from '../../types';

export default class Market extends Base {
  public getExchangeInfo(): Promise<SpotExchangeInfo> {
    return this.request('GET', '/api/v3/exchangeInfo');
  }
}
