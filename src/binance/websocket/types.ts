export type Timestamp = number;

export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum OrderType {
  LIMIT = 'LIMIT',
  LIMIT_MAKER = 'LIMIT_MAKER',
  MARKET = 'MARKET',
  STOP_LOSS = 'STOP_LOSS',
  STOP_LOSS_LIMIT = 'STOP_LOSS_LIMIT',
  TAKE_PROFIT = 'TAKE_PROFIT',
  TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT',
}

export enum OrderStatus {
  NEW = 'NEW',
  PARTIALLY_FILLED = 'PARTIALLY_FILLED',
  FILLED = 'FILLED',
  CANCELED = 'CANCELED',
  PENDING_CANCEL = 'PENDING_CANCEL',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  EXPIRED_IN_MATCH = 'EXPIRED_IN_MATCH',
}

export enum TimeInForce {
  GTC = 'GTC',
  IOC = 'IOC',
  FOK = 'FOK',
  GTX = 'GTX',
}

export type OrderId = number;
export type ClientOrderId = string;
export type Asset = string;
export type Price = string;
export type Quantity = string;

export enum SelfTradePreventionMode {
  EXPIRE_TAKER = 'EXPIRE_TAKER',
  EXPIRE_MAKER = 'EXPIRE_MAKER',
  EXPIRE_BOTH = 'EXPIRE_BOTH',
  NONE = 'NONE',
}

export interface BookTickerEvent {
  u: number;                    // order book updateId
  s: string;                    // symbol
  b: Price;                     // best bid price
  B: Quantity;                  // best bid qty
  a: Price;                     // best ask price
  A: Quantity;                  // best ask qty
}

export interface AccountUpdateEvent {
  e: 'outboundAccountPosition'; //Event type
  E: Timestamp;                 //Event Time
  u: Timestamp;                 //Time of last account update
  B: [                          //Balances Array
    {
      a: Asset;                 //Asset
      f: string;                //Free
      l: string;                //Locked
    }
  ]
}

export interface BalanceUpdateEvent {
  e: 'balanceUpdate';           //Event Type
  E: Timestamp;                 //Event Time
  a: Asset;                    //Asset
  d: string;                    //Balance Delta
  T: Timestamp;                 //Clear Time
}

export interface OrderUpdateEvent {
  e: 'executionReport';         // Event type
  E: Timestamp;                 // Event time
  s: string;                    // Symbol
  c: ClientOrderId;             // Client order ID
  S: OrderSide;                 // Side
  o: OrderType;                 // Order type
  f: TimeInForce;               // Time in force
  q: Quantity;                  // Order quantity
  p: Price;                     // Order price
  P: Price;                     // Stop price
  F: Quantity;                  // Iceberg quantity
  g: -1,                        // OrderListId
  C: '',                        // Original client order ID; This is the ID of the order being canceled
  x: OrderType,                 // Current execution type
  X: OrderStatus,               // Current order status
  r: 'NONE',                    // Order reject reason; will be an error code.
  i: OrderId,                   // Order ID
  l: Quantity,                  // Last executed quantity
  z: Quantity,                  // Cumulative filled quantity
  L: Price,                     // Last executed price
  n: '0';                       // Commission amount
  N: null;                      // Commission asset
  T: Timestamp;                 // Transaction time
  t: -1;                        // Trade ID
  I: 8641984;                   // Ignore
  w: boolean;                   // Is the order on the book?
  m: boolean;                   // Is this trade the maker side?
  M: boolean;                   // Ignore
  O: Timestamp;                 // Order creation time
  Z: Quantity;                  // Cumulative quote asset transacted quantity
  Y: Quantity;                  // Last quote asset transacted quantity (i.e. lastPrice * lastQty)
  Q: Quantity;                  // Quote Order Quantity
  W: Timestamp;                 // Working Time; This is only visible if the order has been placed on the book.
  V: SelfTradePreventionMode;   // selfTradePreventionMode
}
