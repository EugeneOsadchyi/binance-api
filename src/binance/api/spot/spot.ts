import { Market, Trade, UserDataStream, Wallet } from './modules';

export default class Spot {
  public market: Market;
  public trade: Trade;
  public userDataStream: UserDataStream;
  public wallet: Wallet;

  constructor(apiKey: string, secretKey: string, isTestnet = false) {
    this.market = new Market(apiKey, secretKey, isTestnet);
    this.trade = new Trade(apiKey, secretKey, isTestnet);
    this.userDataStream = new UserDataStream(apiKey, secretKey, isTestnet);
    this.wallet = new Wallet(apiKey, secretKey, isTestnet);
  }
}
