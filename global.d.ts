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
}

declare global {
  interface Window {
    _PRELOADED_STATE_: unknown;
    [index: string]: unknown;
  }
}
