import { Transformer } from '@parcel/plugin';
import { base64 } from './utils';
import { PluginConfig, PlainObject } from './types';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');

const defaultLimit = 10240;

export default new Transformer<PluginConfig>({
  async loadConfig(arg) {
    const json = (await arg.config.getPackage()) as unknown as PlainObject<PlainObject>;
    const config: PluginConfig = {
      limit: defaultLimit,
      ...(json[pkg.name] || {}),
    };

    return config;
  },
  async transform({ asset, config }) {
    const { limit = defaultLimit } = config;
    const file = await (await asset.getBuffer()).toString('binary');

    if (file.length <= limit) {
      const res = await base64(file, asset.filePath);
      const code = `export default "${res}";`;
      asset.type = 'js';
      asset.setCode(code);
    } else {
      asset.bundleBehavior = 'isolated';
    }

    return [asset];
  },
  canReuseAST() {
    return false;
  },
});
