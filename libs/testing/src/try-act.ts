type TryActResult<T> = { result?: T; error?: Error };

function isPromiseLike<T>(obj: any): obj is PromiseLike<T> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return typeof obj?.then === 'function';
}

export function tryAct<T>(callback: () => Promise<T>): Promise<TryActResult<T>>;
export function tryAct<T>(callback: () => T): TryActResult<T>;
export function tryAct<T>(
  callback: () => T | Promise<T>,
): TryActResult<T> | Promise<TryActResult<T>> {
  try {
    const callbackResult = callback();

    if (isPromiseLike<T>(callbackResult)) {
      return callbackResult.then(
        (result) => ({ result }),
        (error) => ({ error: error as Error }),
      );
    }

    return { result: callbackResult };
  } catch (e) {
    return { error: e as Error };
  }
}
