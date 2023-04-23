import Account from './futures/account';

export default class Futures {
  public account: Account;

  constructor(apiKey: string, secretKey: string, isTestnet = false) {
    this.account = new Account(apiKey, secretKey, isTestnet, true);
  }
}
