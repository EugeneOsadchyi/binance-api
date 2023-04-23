import Base from '../base';
import type { AccountInformation, AccountBalance, OpenOrder } from './types';

export default class Account extends Base {
  public getAccountInformation(): Promise<AccountInformation> {
    return this.signedRequest('GET', '/fapi/v2/account');
  }

  public getAccountBalance(): Promise<AccountBalance[]> {
    return this.signedRequest('GET', '/fapi/v2/balance');
  }

  public getOpenOrders(params?: { symbol?: string }): Promise<OpenOrder[]> {
    return this.signedRequest('GET', '/fapi/v1/openOrders', params);
  }
}
