# visualforce-seed

__[NOTICE] This project is experiment. Don't use in production environment.__


## precondition

* node >= 0.12

## install 

```
git clone https://github.com/flect-mitsuruog/visualforce-seed.git <YOUR-PROJECT-NAME>
cd <YOUR-PROJECT-NAME>
npm install
```

### プロジェクト構成

```

```

### credentials情報の設定

Salesfoce環境(以下、SFDC)へAPIアクセスするためのcredentials情報を設定します。`config/credentials.sample.json`を`config/credentials.json`へコピーして、次の項目を正しいcredentials情報へと置き換えます。

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

## How to use


### visualforceページのbuild

### deploy



## Licence

MIT
