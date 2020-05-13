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

  interface Window {
    [index: string]: any,
  }
}
