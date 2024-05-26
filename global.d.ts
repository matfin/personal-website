export {};
declare namespace NodeJS {
  export interface Process {
    browser: boolean;
  }
}

declare global {
  interface caches<T> {
    open(string): Promise<T>;
    match(string): Promise<T>;
    keys(): Promise<T>;
  }

  interface Window {
    preloadedState: unknown;
    [index: string]: unknown;
  }
}
