import Base from '../base';
import type {
  AllOrdersParams, CancelOrderParams, OrderParams, ReplaceOrderParams, OpenOrder, NewOrderResponse, CancelOrderResponse, Order,
} from './types';

export default class Wallet extends Base {
  public getAccountInfo() {
    return this.signedRequest('GET', '/api/v3/account');
  }

  public newTestOrder(order: OrderParams) {
    return this.signedRequest('POST', '/api/v3/order/test', order);
  }

  public newOrder(order: OrderParams): Promise<NewOrderResponse> {
    return this.signedRequest('POST', '/api/v3/order', order);
  }

  public cancelOrder(params: CancelOrderParams): Promise<CancelOrderResponse> {
    return this.signedRequest('DELETE', '/api/v3/order', params);
  }

  public cancelAllOpenOrders(params: { symbol: string }) {
    return this.signedRequest('DELETE', '/api/v3/openOrders', params);
  }

  public getOrder(params: { symbol: string; orderId?: number; origClientOrderId?: string }) {
    return this.signedRequest('GET', '/api/v3/order', params);
  }

  public replaceOrder(params: ReplaceOrderParams) {
    return this.signedRequest('POST', '/api/v3/order/cancelReplace', params);
  }

  public getOpenOrders(params: { symbol?: string } = {}): Promise<OpenOrder[]> {
    return this.signedRequest('GET', '/api/v3/openOrders', params);
  }

  public getAllOrders(params: AllOrdersParams): Promise<Order[]> {
    return this.signedRequest('GET', '/api/v3/allOrders', params);
  }
}
