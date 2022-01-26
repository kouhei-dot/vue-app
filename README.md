# vue-app

## 概要
Vue.jsとサーバーレス技術で構成されたwebアプリケーションです。<br/>
以下のコンテンツの一覧です。

- Todo管理
- Qiitaの記事検索
- ビットコインレートの取得

webAPIを使ったり、Firebaseで認証をしてみたり、AWS使ったりしてます。<br/>
ちなみに全て無料で利用可能です。

### 動作確認したい方へ
[こちら](http://my-aws-training-bucket-2021.s3-website-ap-northeast-1.amazonaws.com/)で実際に動かすことができます。<br/>
バックエンドとの通信はhttpsですが、フロントのコンテンツ取得はhttpとなっています。ご了承ください。

## アーキテクチャ
![インフラ設計](/doc/img/aws_infra_design.drawio.png)

## 使用技術・バージョン
- Vue.js 2.6.11
- Node.js 14.17.3
- npm 6.14.13
- Typescript 4.5.1
- BootstrapVue 2.21.2
- axios 0.23.0

---------------------------------------

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
