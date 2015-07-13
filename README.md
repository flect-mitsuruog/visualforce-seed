# visualforce-seed

__[NOTICE] This project is experiment. Don't use in production environment.__


## 前提条件(precondition)

* node >= 0.12

## インストール方法(install) 

```
git clone https://github.com/flect-mitsuruog/visualforce-seed.git <YOUR-PROJECT-NAME>
cd <YOUR-PROJECT-NAME>
npm install
```

## プロジェクト構成(project structure)

```
.
├── Gruntfile.js
├── LICENSE
├── README.md
├── config
│   ├── config.json // gruntタスクで利用する設定情報
│   └── credentials.sample.json // SFDCのcredentials情報
├── grunt // gruntタスク
├── input
│   ├── pages // Visualforceページ格納場所
│   └── staticresources // 静的リソース格納場所
│       └── sampleResources
│           ├── css
│           ├── img
│           └── js
├── node_modules
├── output // build先フォルダ
└── package.json
```

## 初期設定(bootstap)

### credentials情報の設定

Salesfoce.com環境(以下、SFDC)へAPIアクセスするためのcredentials情報を設定します。`config/credentials.sample.json`を`config/credentials.json`へコピーして、次の項目を正しいcredentials情報へと置き換えます。

__config/credentials.json__
```
{
  "dev": {
    "user": "<your-account-id>", // ex) someone@flect.co.jp
    "pass": "<your-account-password>",// ログインパスワード
    "token": "<your-security-token>"
  },
  "sandbox": {
    "user": "<your-account-id>",
    "pass": "<your-account-password>",
    "token": "<your-security-token>"
  }
}
```

> (注意) `token`は必須ではありません。 `sandbox`も環境が存在しない場合は必要ありません。

### Visualforceページ名の変更

Visualforceページ名を変更します。`input/pages`配下の`html`が自動的にVisualforceページに変換され、ファイル名がVisualforceページ名となりますので、正しい名称に変更してください。

```
input/pages/index.html
=> `index`がVisualforceページ名になります。
```

### 静的リソース名の変更

静的リソース名を変更します。`input/staticresources`配下のフォルダ名が自動的に静的リソース名になりますので、正しい名称に変更してください。

```
input/staticresources/sampleResources
=> `sampleResources`が静的リソース名になります。
```

### index.htmlからの静的リソース呼び出し

`index.html`にて静的リソースを呼び出している箇所を変更します。

```html
例）css
<link rel="stylesheet" href="../staticresources/sampleResources/css/normalize.css">

例）javascript
<script src="../staticresources/sampleResources/js/main.js"></script>

例）image
<img src="../staticresources/sampleResources/img/logo.png" alt="">
```

### サンプルdeploy

以上で、初期設定は完了です。SFDC上にデプロイして`Hello world`を表示させましょう。

```
grunt deploy:dev
```

正しくdeployできた場合は、次のようなログが出力されます。

```
deploy:
[sf:deploy] Request for a deploy submitted successfully.
[sf:deploy] Request ID for the current deploy task: XXXXXXXXXXX
[sf:deploy] Waiting for server to finish processing the request...
[sf:deploy] Request Status: InProgress
[sf:deploy] Request Status: Succeeded
[sf:deploy] *********** DEPLOYMENT SUCCEEDED ***********
[sf:deploy] Finished request XXXXXXXXXXX successfully.

BUILD SUCCESSFUL
Total time: 12 seconds
```

SFDC上にログインして、実際にvisualforceページと静的リソースがdeployできたことを確認します。

## 利用方法(usege)

### build

```
grunt build
```

### deploy

開発環境
```
grunt deploy:dev 
```

sandbox環境  
(最初コメントにしてあります。有効にする必要があれば`grunt/nv-deploy.js`のコメントを解除してください。)
```
grunt deploy:sandbox
```

sandbox環境から本番環境へのリリースは__SFDC上のリリース機能__を利用してください。

### RemoteObjectヘルパー

本プロジェクトにはSFDC上のオブジェクトに対してJavascriptから簡単にアクセスするためのHelper関数(以下、sObjectStore)を含んでいます。`sObjectStore`はRemoteObjectの実体である、`SObject`のfetchに特化したラッパー関数です。
コードは`input/staticresources/sampleResources/js/sObjectStore.js`を参照してください。

利用方法です。

1. Visualforceページにて利用するRemoteObjectを宣言する
2. `sObjectStore`を宣言
2. `sObjectStore`に利用するRemoteObjectのKeyリストを定義する
3. `sObjectStore`の検索条件を定義する
3. 利用するRemoteObject名を指定して`SObject`をインスタンス化する
4. 結果を取得

__index.html__

```html
<!DOCTYPE html>
<html lang="en">

<!-- 1. 利用するRemoteObjectとproperty名を宣言する -->
<apex:remoteObjects>
  <apex:remoteObjectModel name="User" jsShorthand="WorkingRecord" fields="Id, Name, IsActive">
  </apex:remoteObjectModel>
</apex:remoteObjects>

<head>
...
```
__input/staticresources/sampleResources/js/main.js__
```js
(function() {
  'use strict';

  // 2. sObjectStoreを宣言
  var DataStore = window.Flect_SObjectStore;

  function initialize() {

    // 3. `sObjectStore`に利用するRemoteObjectのKeyリストを定義する
    var keys = ['Id', 'Name'];
    // 4. `sObjectStore`の検索条件を定義する
    var condition = {
      limit: 100,
      where: {
        IsActive: {
          eq: true
        }
      }
    };

    // 5. 利用するRemoteObject名を指定して`SObject`をインスタンス化する
    DataStore.fetch(new SObjectModel.User(), condition, keys)
      .then(function(data) {
        // 6. 結果を取得
        console.log(data);
      }).catch(function(err) {
        console.log(err);
      });

  }

  document.addEventListener('DOMContentLoaded', function(event) {
    initialize();
  });

})();
```

## Licence

MIT
