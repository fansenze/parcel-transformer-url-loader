# parcel-pugin-url-loader  
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)  

#### use `base64` encode file when you `import` file in `js`    

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
    "exts": ["jpg", "jpeg", "png", "gif"],
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
