import { existsSync } from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

import { join } from 'path';
import { readFile } from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1337;

    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1337;

    doStuffByTimeout(callback, timeout);

    expect(callback).toBeCalledTimes(0);

    jest.runAllTimers();

    expect(callback).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 1337;

    jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, timeout);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1337;

    doStuffByInterval(callback, timeout);

    expect(callback).toHaveBeenCalledTimes(0);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

jest.mock('fs');
jest.mock('fs/promises');

jest.mock('path', () => {
  const originalPathModule = jest.requireActual('path');

  return {
    ...originalPathModule,
    join: jest.fn((...args) => originalPathModule.join(...args)),
  };
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const path = 'jest.config.js';

    readFileAsynchronously(path);

    expect(join).toHaveBeenLastCalledWith(__dirname, path);
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('not-exisiting-file.ts');
    expect(result).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const mockedContent = 'test';

    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(mockedContent);

    const res = await readFileAsynchronously('fileName');
    expect(res).toBe(mockedContent);
  });
});
