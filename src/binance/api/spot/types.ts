
export type Timestamp = number;
export type OrderSide = 'BUY' | 'SELL';
export type TimeInForce = 'GTC' | 'IOC' | 'FOK';
export type NewOrderResponseType = 'ACK' | 'RESULT' | 'FULL';
export type SelfTradePreventionMode = 'EXPIRE_TAKER' | 'EXPIRE_MAKER' | 'EXPIRE_BOTH' | 'NONE';
export type OrderType = 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT' | 'LIMIT_MAKER';
export type OrderStatus = 'NEW' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELED' | 'PENDING_CANCEL' | 'REJECTED' | 'EXPIRED' | 'EXPIRED_IN_MATCH';
export type WorkingType = 'MARK_PRICE' | 'CONTRACT_PRICE';
export type PositionSide = 'BOTH' | 'LONG' | 'SHORT';

export interface OrderParams {
  symbol: string;
  side: OrderSide;
  type: OrderType;
  timeInForce?: TimeInForce;
  quantity?: string;
  quoteOrderQty?: number;
  price?: string;
  newClientOrderId?: string;
  strategyId?: number;
  strategyType?: string;
  stopPrice?: number;
  trailingDelta?: number;
  icebergQty?: number;
  newOrderRespType?: NewOrderResponseType;
  selfTradePreventionMode?: SelfTradePreventionMode;
}

export type NewOrderResponse = NewOrderOrderResponseAck | NewOrderOrderResponseResult | NewOrderResponseFull;

export interface NewOrderOrderResponseAck {
  symbol: string;
  orderId: number;
  orderListId: -1, //Unless OCO, value will be -1
  clientOrderId: string;
  transactTime: Timestamp;
}

export interface NewOrderOrderResponseResult {
  symbol: string;
  orderId: number;
  orderListId: -1; //Unless OCO, value will be -1
  clientOrderId: string;
  transactTime: Timestamp;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: OrderStatus;
  timeInForce: TimeInForce;
  type: OrderType;
  side: OrderSide;
  workingTime: Timestamp;
  selfTradePreventionMode: SelfTradePreventionMode;
}

export interface NewOrderResponseFull {
  symbol: string;
  orderId: number;
  orderListId: -1; //Unless OCO, value will be -1
  clientOrderId: string,
  transactTime: Timestamp;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: OrderStatus;
  timeInForce: TimeInForce;
  type: OrderType;
  side: OrderSide;
  workingTime: Timestamp;
  selfTradePreventionMode: SelfTradePreventionMode;
  fills: NewOrderResponseFill[]
}

interface NewOrderResponseFill {
  price: string;
  qty: string;
  commission: string;
  commissionAsset: string;
  tradeId: number;
}

export type CancelOrderRestrictions = 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';

export interface CancelOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
  cancelRestrictions?: CancelOrderRestrictions;
}

export interface CancelOrderResponse {
  clientOrderId: string;
  cumQty: string;
  cumQuote: string;
  executedQty: string;
  orderId: number;
  origQty: string;
  origType: OrderType;
  price: string;
  reduceOnly: boolean;
  side: OrderSide;
  positionSide: PositionSide;
  status: OrderStatus;
  stopPrice: string;                // please ignore when order type is TRAILING_STOP_MARKET
  closePosition: boolean;           // if Close-All
  symbol: string;
  timeInForce: TimeInForce;
  type: OrderType;
  activatePrice: string;            // activation price, only return with TRAILING_STOP_MARKET order
  priceRate: string;                // callback rate, only return with TRAILING_STOP_MARKET order
  updateTime: Timestamp;
  workingType: WorkingType;
  priceProtect: false;              // if conditional order trigger is protected
}

export type CancelReplaceMode = 'STOP_ON_FAILURE' | 'ALLOW_FAILURE';

export interface ReplaceOrderParams extends OrderParams {
  cancelReplaceMode: CancelReplaceMode;
  cancelNewClientOrderId?: string;
  cancelOrigClientOrderId?: string;
  cancelOrderId?: number;
  origClientOrderId: string;
}

export interface AllOrdersParams {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit: number;
}

export interface OpenOrder {
  symbol: string;
  orderId: number;
  orderListId: -1; //Unless OCO, the value will always be -1
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: 'NEW';
  timeInForce: TimeInForce;
  type: OrderType;
  side: OrderSide;
  stopPrice: string;
  icebergQty: string;
  time: Timestamp;
  updateTime: Timestamp;
  isWorking: true;
  workingTime: Timestamp;
  origQuoteOrderQty: string;
  selfTradePreventionMode: SelfTradePreventionMode;
}

export interface SpotExchangeInfoSymbol {
  symbol: string;
  status: 'TRADING';
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quotePrecision: number;
  quoteAssetPrecision: number;
  orderTypes: OrderType[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  allowTrailingStop: boolean;
  cancelReplaceAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: object[];
  permissions: ['SPOT', 'MARGIN'];
  defaultSelfTradePreventionMode: 'NONE';
  allowedSelfTradePreventionModes: ['NONE'];
}

export interface SpotExchangeInfo {
  timezone: 'UTC';
  serverTime: number;
  rateLimits: object[];
  exchangeFilters: object[];
  symbols: SpotExchangeInfoSymbol[];
}

export interface SpotAssetDetail {
  [asset: string]: {
    minWithdrawAmount: string;
    depositStatus: boolean;
    withdrawFee: number;
    withdrawStatus: boolean;
    depositTip?: string;
  }
}

export interface SpotUserAsset {
  asset: string;
  free: string;
  locked: string;
  freeze: string;
  withdrawing: string;
  ipoable: string;
  btcValuation: string;
}
