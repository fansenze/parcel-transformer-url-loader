# parcel-transformer-url-loader

**use `base64` encode file in `js` and `css`(includes `sass`/`less` etc.)**

the plugin will unlink file in `production`(parcel env).

## Installation
> if you use **Parcel 1.x**, you should install `parcel-plugin-url-loader@1.3.1`.

### npm
```bash
npm i parcel-transformer-url-loader -D
```

### yarn
```bash
yarn add parcel-transformer-url-loader --dev
```

## Usage

### define transformers for parcel

you must define glob in `.parcelrc` to match files for the transformer of `parcel-transformer-url-loader`.

for example:
```json
// .parcelrc
{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.{png,jpg,jpeg}": ["parcel-transformer-url-loader"]
  }
}
```

### Configuration

✨✨✨ If you have used `url-loader` in `webpack`, you'll feel familiar with it.

#### there is default options in package.json
```json
{
  "parcel-transformer-url-loader": {
    "limit": 10240
  }
}
```

#### if you want to have your configuration

you can define "parcel-transformer-url-loader" in you `package.json`.

for example:
```json
{
  "name": "your project",
  "scripts": {},
  "parcel-transformer-url-loader": {
    "limit": 8888
  }
}
```



