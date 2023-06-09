import ApiError from '../../errors/ApiError';
import UnknownError from '../../errors/UnknownError';
import { buildQueryString } from '../utils';

export interface Options {
  headers?: object;
  query?: object | string;
}

export default abstract class Base {
  async request(method: string, path: string, options: Options = {}) {
    let url = `${this.getBaseURL()}${path}`;

    const requestInit: RequestInit = {
      method,
      headers: { ...options.headers },
    };

    let queryString = '';

    if (typeof options.query == 'object') {
      queryString = buildQueryString(options.query);
    } else if (typeof options.query == 'string') {
      queryString = options.query;
    }

    if (queryString) {
      url = `${url}?${queryString}`;
    }

    return fetch(url, requestInit).then(this.handleResponse);
  }

  private async handleResponse(response: Response) {
    let responseText = await response.text();
    let responseJSON = null;

    try {
      responseJSON = JSON.parse(responseText);
    } catch (error) {}

    if (response.ok) {
      return responseJSON;
    }

    responseText = responseText.trim();
    const [, responseTitle] = responseText.match(/<title>(.*?)<\/title>/) || [];
    if (responseTitle) {
      throw new ApiError(responseTitle);
    }

    const message = responseJSON?.msg;
    const code = responseJSON?.code;

    if (message || code) {
      throw new ApiError(message + ` Code: ${code}`);
    }

    if (responseText) {
      throw new ApiError(responseText);
    }

    throw new UnknownError(`Request failed. status=${response.status}`);
  }

  abstract getBaseURL(): string;
}
