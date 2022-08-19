export interface PlainObject<T = unknown> {
  [key: string]: T;
}

export interface PluginConfig {
  /**
   * @default 10240
   */
  limit?: number;
}
