
type Timestamp = number;
type Side = 'BUY' | 'SELL';
type TimeInForce = 'GTC' | 'IOC' | 'FOK' | 'GTX';
type NewOrderResponseType = 'ACK' | 'RESULT' | 'FULL';
type SelfTradePreventionMode = 'EXPIRE_TAKER' | 'EXPIRE_MAKER' | 'EXPIRE_BOTH' | 'NONE';
type OrderType = "LIMIT" | "LIMIT_MAKER" | "MARKET" | "STOP_LOSS" | "STOP_LOSS_LIMIT" | "TAKE_PROFIT" | "TAKE_PROFIT_LIMIT";
type OrderStatus = "NEW" | "PARTIALLY_FILLED" | "FILLED" | "CANCELED" | "PENDING_CANCEL" | "REJECTED" | "EXPIRED" | "EXPIRED_IN_MATCH";

export interface OrderParams {
  symbol: string;
  side: Side;
  type: OrderType;
  timeInForce: TimeInForce;
  quantity?: string;
  quoteOrderQty?: number;
  price?: string;
  newClientOrderId?: string;
  strategyId?: number;
  strategyType?: string;
  stopPrice?: number;
  trailingDelta?: number;
  icebergQty?: number;
  newOrderRespType: NewOrderResponseType;
  selfTradePreventionMode?: SelfTradePreventionMode;
}

type CancelOrderRestrictions = 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';

export interface CancelOrderParams {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
  cancelRestrictions?: CancelOrderRestrictions;
}

type CancelReplaceMode = 'STOP_ON_FAILURE' | 'ALLOW_FAILURE';

export interface ReplaceOrderParams extends OrderParams {
  cancelReplaceMode: CancelReplaceMode;
  cancelNewClientOrderId?: string;
  cancelOrigClientOrderId?: string;
  cancelOrderId?: number;
  origClientOrderId: string;
};

export interface AllOrdersParams {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit: number;
}

export interface OpenOrder {
  "symbol": string,
  "orderId": number,
  "orderListId": -1, //Unless OCO, the value will always be -1
  "clientOrderId": string,
  "price": string,
  "origQty": string,
  "executedQty": string,
  "cummulativeQuoteQty": string,
  "status": "NEW",
  "timeInForce": TimeInForce,
  "type": OrderType,
  "side": Side,
  "stopPrice": string,
  "icebergQty": string,
  "time": Timestamp,
  "updateTime": Timestamp,
  "isWorking": true,
  "workingTime": Timestamp,
  "origQuoteOrderQty": string,
  "selfTradePreventionMode": SelfTradePreventionMode
}

interface SpotExchangeInfoSymbol {
  symbol: string;
  status: "TRADING";
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
  permissions: ["SPOT", "MARGIN"];
  defaultSelfTradePreventionMode: "NONE";
  allowedSelfTradePreventionModes: ["NONE"];
}

export interface SpotExchangeInfo {
  timezone: "UTC";
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
