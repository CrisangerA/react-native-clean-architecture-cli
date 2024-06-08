export * from './array';

/**
 * The `delay` function is an asynchronous function that waits for a specified
 * number of milliseconds before resolving.
 * @param {number} ms - The `ms` parameter in the `delay` function represents the
 * number of milliseconds to delay the execution of the code.
 * @returns a Promise.
 */
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function log(...messages: any[]) {
  if (__DEV__) {
    const msjs = messages.map((m) =>
      typeof m === 'object' ? JSON.stringify(m) : m,
    );
    console.log('> ' + msjs.join(' '));
  }
}