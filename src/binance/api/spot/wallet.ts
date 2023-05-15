import Base from '../base';
import type { SpotAssetDetail, SpotUserAsset } from './types';

export default class Wallet extends Base {
  public getAccountStatus() {
    return this.signedRequest('GET', '/sapi/v1/account/status');
  }

  public getAssetDetail(): Promise<SpotAssetDetail> {
    return this.signedRequest('GET', '/sapi/v1/asset/assetDetail');
  }

  public getUserAsset(params: { asset?: string } = {}): Promise<SpotUserAsset[]> {
    return this.signedRequest('POST', '/sapi/v3/asset/getUserAsset', params);
  }
}
