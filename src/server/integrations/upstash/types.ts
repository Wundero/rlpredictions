export interface Cache {
  get<T>(key: string, revive?: (input: string) => T): Promise<T | null>;
  set<T>(
    key: string,
    value: T,
    ttl?: number,
    serialize?: (input: T) => string
  ): Promise<void>;
  cache<T>(
    key: string,
    getter: () => T | Promise<T>,
    ttl?: number,
    revive?: (input: string) => T,
    serialize?: (input: T) => string
  ): Promise<T>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}
