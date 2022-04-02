export {};
declare namespace NodeJS {
  export interface Process {
    browser: boolean
  }
}

declare global {
  interface caches {
    open(string): Promise<any>,
    match(string): Promise<any>,
    keys(): Promise<any>,
  }
}

declare global {
  interface Window {
    _PRELOADED_STATE_: any
    [index: string]: any,
  }
}
