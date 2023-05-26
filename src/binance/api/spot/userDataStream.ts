import Base from '../base';

export default class UserDataStream extends Base {
  public createListenKey(): Promise<{ listenKey: string }> {
    return this.userStreamRequest('POST', '/api/v3/userDataStream');
  }

  public keepAliveListenKey(listenKey: string): Promise<unknown> {
    return this.userStreamRequest('PUT', '/api/v3/userDataStream', { listenKey });
  }

  public closeListenKey(listenKey: string): Promise<unknown> {
    return this.userStreamRequest('DELETE', '/api/v3/userDataStream', { listenKey });
  }
}
