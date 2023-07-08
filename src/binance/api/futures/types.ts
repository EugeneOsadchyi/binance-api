type Timestamp = number;

export enum PositionSideEnum {
  LONG = 'LONG',
  SHORT = 'SHORT',
  BOTH = 'BOTH',
}
export type PositionSide = keyof typeof PositionSideEnum;

export enum OrderSideEnum {
  BUY = 'BUY',
  SELL = 'SELL',
}
export type OrderSide = keyof typeof OrderSideEnum;

export enum OrderTypeEnum {
  LIMIT = 'LIMIT',
  MARKET = 'MARKET',
  STOP = 'STOP',
  STOP_MARKET = 'STOP_MARKET',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_MARKET = 'TAKE_PROFIT_MARKET',
  TRAILING_STOP_MARKET = 'TRAILING_STOP_MARKET',
}
export type OrderType = keyof typeof OrderTypeEnum;

export enum OrderStatusEnum {
  NEW = 'NEW',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}
export type OrderStatus = keyof typeof OrderStatusEnum;

export enum TimeInForceEnum {
  GTC = 'GTC',
  IOC = 'IOC',
  FOK = 'FOK',
  GTX = 'GTX',
}
export type TimeInForce = keyof typeof TimeInForceEnum;

export enum WorkingTypeEnum {
  MARK_PRICE = 'MARK_PRICE',
  CONTRACT_PRICE = 'CONTRACT_PRICE',
}
export type WorkingType = keyof typeof WorkingTypeEnum;

export enum ResponseTypeEnum {
  ACK = 'ACK',
  RESULT = 'RESULT',
}
export type ResponseType = keyof typeof ResponseTypeEnum;

type OrderId = number;
type ClientOrderId = string;
type Asset = string;
type Price = string;
type Quantity = string;

export interface AccountInformation {
  feeTier: number;                  // account commission tier
  canTrade: boolean;                // if can trade
  canDeposit: boolean;              // if can transfer in asset
  canWithdraw: boolean;             // if can transfer out asset
  updateTime: number;               // reserved property, please ignore
  multiAssetsMargin: boolean;
  totalInitialMargin: string;       // total initial margin required with current mark price (useless with isolated positions), only for USDT asset
  totalMaintMargin: string;         // total maintenance margin required, only for USDT asset
  totalWalletBalance: string;       // total wallet balance, only for USDT asset
  totalUnrealizedProfit: string;    // total unrealized profit, only for USDT asset
  totalMarginBalance: string;       // total margin balance, only for USDT asset
  totalPositionInitialMargin: string;    // initial margin required for positions with current mark price, only for USDT asset
  totalOpenOrderInitialMargin: string;   // initial margin required for open orders with current mark price, only for USDT asset
  totalCrossWalletBalance: string;  // crossed wallet balance, only for USDT asset
  totalCrossUnPnl: string;          // unrealized profit of crossed positions, only for USDT asset
  availableBalance: string;         // available balance, only for USDT asset
  maxWithdrawAmount: string;        // maximum amount for transfer out, only for USDT asset
  assets: AccountInformationAsset[];
  positions: AccountInformationPosition[];
}

export interface AccountInformationAsset {
  asset: Asset;                       // asset name
  walletBalance: string;              // wallet balance
  unrealizedProfit: string;           // unrealized profit
  marginBalance: string;              // margin balance
  maintMargin: string;                // maintenance margin required
  initialMargin: string;              // total initial margin required with current mark price
  positionInitialMargin: string;      //initial margin required for positions with current mark price
  openOrderInitialMargin: string;     // initial margin required for open orders with current mark price
  crossWalletBalance: string;         // crossed wallet balance
  crossUnPnl: string;                 // unrealized profit of crossed positions
  availableBalance: string;           // available balance
  maxWithdrawAmount: string;          // maximum amount for transfer out
  marginAvailable: boolean;           // whether the asset can be used as margin in Multi-Assets mode
  updateTime: Timestamp;              // last update time
}

export interface AccountInformationPosition {
  symbol: string;                     // symbol
  initialMargin: string;              // initial margin required with current mark price
  maintMargin: string;                // maintenance margin required
  unrealizedProfit: Price;            // unrealized profit
  positionInitialMargin: string;      // initial margin required for positions with current mark price
  openOrderInitialMargin: string;     // initial margin required for open orders with current mark price
  leverage: string;                   // current initial leverage
  isolated: boolean;                  // if isolated position (true/false)
  entryPrice: Price;                  // average entry price
  maxNotional: string;                // maximum available notional with current leverage
  bidNotional: string;                // bids notional, ignore
  askNotional: string;                // ask notional, ignore
  notional: string;                   // position notional value
  isolatedWallet: string;             // isolated wallet (if isolated position)
  positionSide: PositionSide;         // position side
  positionAmt: Quantity;              // position amount
  updateTime: Timestamp;              // last update time
}

export interface OpenOrder {
  avgPrice: Price;
  clientOrderId: ClientOrderId;
  cumQuote: string;
  executedQty: Quantity;
  orderId: OrderId;
  origQty: Quantity;
  origType: OrderType;
  price: Price;
  reduceOnly: boolean;
  side: OrderSide;
  positionSide: PositionSide;
  status: OrderStatus;
  stopPrice: Price;                 // please ignore when order type is TRAILING_STOP_MARKET
  closePosition: false;             // if Close-All
  symbol: string;
  time: Timestamp;                  // order time
  timeInForce: TimeInForce;
  type: OrderType;
  activatePrice: Price;             // activation price, only return with TRAILING_STOP_MARKET order
  priceRate: string;                // callback rate, only return with TRAILING_STOP_MARKET order
  updateTime: Timestamp;            // update time
  workingType: WorkingType;
  priceProtect: boolean;            // if conditional order trigger is protected
}

export interface AccountBalance {
  accountAlias: string;           // unique account code
  asset: Asset;                   // asset name
  balance: string;                // wallet balance
  crossWalletBalance: string;     // crossed wallet balance
  crossUnPnl: string              // unrealized profit of crossed positions
  availableBalance: string;       // available balance
  maxWithdrawAmount: string;      // maximum amount for transfer out
  marginAvailable: boolean;       // whether the asset can be used as margin in Multi-Assets mode
  updateTime: Timestamp;
}
