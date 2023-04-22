import { buildQueryString } from "../utils";

export interface Options {
  headers?: object;
  query?: object | string;
}

export default abstract class Base {
  async request(method: string, path: string, options: Options = {}) {
    let url = `${this.getBaseURL()}${path}`;

    const requestInit: RequestInit = {
      method,
      headers: {
        ...options.headers,
      },
    };

    let queryString = '';

    if (typeof options.query == 'object') {
      queryString = buildQueryString(options.query)
    } else if (typeof options.query == 'string') {
      queryString = options.query;
    }

    if (queryString) {
      url = `${url}?${queryString}`;
    }

    try {
      const response = await fetch(url, requestInit);

      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  abstract getBaseURL(): string;
}
