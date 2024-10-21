import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: jest.fn((f) => f),
}));

const url = 'posts/1';
const mockResponse = { data: 'test response' };

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const url = 'posts/1';

    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponse),
    });

    throttledGetDataFromApi(url);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const get = jest.fn().mockResolvedValue(mockResponse);
    (axios.create as jest.Mock).mockReturnValue({
      get,
    });

    throttledGetDataFromApi(url);
    expect(get).toBeCalledWith(url);
  });

  test('should return response data', async () => {
    const get = jest.fn().mockResolvedValue(mockResponse);
    (axios.create as jest.Mock).mockReturnValue({
      get,
    });

    const response = await throttledGetDataFromApi(url);
    expect(response).toEqual(mockResponse.data);
  });
});
