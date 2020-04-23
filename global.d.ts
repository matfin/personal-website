export {};
declare global {
  interface caches {
    open(string): Promise<any>,
    match(string): Promise<any>,
    keys(): Promise<any>,
  }

  interface Window {
    _PRELOADED_STATE_: any
  }
}
