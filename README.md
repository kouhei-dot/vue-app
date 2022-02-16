# vue-app

## 概要
Vue.jsとサーバーレス技術で構成されたwebアプリケーションです。<br/>
以下のコンテンツの一覧です。

- Todo管理
- Qiitaの記事検索
- ビットコインレートの取得

webAPI、Firebase、AWSを組み合わせてアプリ作りました。<br/>
ちなみに構築・運用まで無料で行えてます。(Lambdaへのリクエストが増加したら料金発生しますが。。)

### 動作確認したい方へ
[こちら](https://fir-project-b00d3.web.app/)で実際に動かすことができます。<br/>
前まではS3の静的ホスティングを利用してましたが、Firebase Hostingの方が使い勝手が良いのと、
デフォルトでHTTPSだったのでこっちに変えました。

## アーキテクチャ
![インフラ設計](/doc/img/serverless_app_infra_design.drawio.png)

## CI/CDについて
本プロジェクトでは、Github Actionsを利用した自動ビルド・デプロイを実行してます。<br>
プルリクがdevelopブランチにマージされることをトリガーにライブラリのインストールとかビルドが行われ、<br>
そのままFirebase Hostingの方へデプロイされます。

## 使用技術・バージョン
- Vue.js 2.6.11
- Vue CLI 4.5.13
- Node.js 14.17.3
- npm 6.14.13
- Typescript 4.5.1
- BootstrapVue 2.21.2
- axios 0.23.0

## ローカル環境構築手順

### 前提
**Node.jsをインストールしている**

### 手順
1. コマンドを実行しGitのリポジトリをクローンする
```
git clone https://github.com/kouhei-dot/vue-app.git
```
2. ライブラリのインストール
```
npm ci
```
3. .env.localファイルの配置
4. ターミナルやコマンドプロンプトで以下のコマンドを実行
```
npm run serve
```
5. ブラウザでlocalhost:8080にアクセス

---------------------------------------

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
