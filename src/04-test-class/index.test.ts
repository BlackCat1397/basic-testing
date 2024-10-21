import { getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(1337).getBalance()).toEqual(1337);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => {
      getBankAccount(1).withdraw(10);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      getBankAccount(1).transfer(10, getBankAccount(0));
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      const account = getBankAccount(1);
      account.transfer(10, account);
    }).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(1);
    account.deposit(13);
    expect(account.getBalance()).toBe(14);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(10);
    account.withdraw(9);
    expect(account.getBalance()).toBe(1);
  });

  test('should transfer money', () => {
    const accountFrom = getBankAccount(100);
    const accountTo = getBankAccount(10);
    accountFrom.transfer(9, accountTo);
    expect(accountFrom.getBalance()).toBe(91);
    expect(accountTo.getBalance()).toBe(19);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    while (true) {
      const b = await account.fetchBalance();
      if (b === null) continue;
      else {
        expect(typeof b).toBe('number');
        break;
      }
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(-1);
    while (true) {
      try {
        await account.synchronizeBalance();
        expect(account.getBalance()).toBeGreaterThanOrEqual(0);
        break;
      } catch (err) {
        // ignored
      }
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(-1);
    while (true) {
      try {
        await account.synchronizeBalance();
      } catch (err) {
        expect(err).toBeInstanceOf(SynchronizationFailedError);
        break;
      }
    }
  });
});
