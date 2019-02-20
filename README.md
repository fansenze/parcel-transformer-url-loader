# parcel-plugin-url-loader  
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 
![DUB](https://img.shields.io/dub/l/vibe-d.svg)
  

#### use `base64` encode file in `js` and `css`(includes `sass`/`less` etc.)    

the plugin will unlink file in `production`(parcel env)

## Installation
```
yarn add parcel-plugin-url-loader --dev
  or
npm i parcel-plugin-url-loader --save-dev
```


## Usage

✨✨✨ If you have used `url-loader` in `webpack`, you'll feel familiar with it  

### there is default options  
```
{
  "url-loader": {
    "exts": ["jpg", "jpeg", "png", "gif", "svg"],
    "limit": 10240
  }
}
```  

### if you want to have your configuration  

first of all, you should touch `.parcelrc` in root path of your project  

#### .parcelrc
```
{
  "url-loader": {
    "exts": ["jpg", "png"],
    "limit": 66666
  }
}

```
