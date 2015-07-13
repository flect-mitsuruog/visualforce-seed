(function() {
  'use strict';

  var SObjectStore = function() {};

  SObjectStore.prototype.fetch = function(dataStore, condition, colList) {

    var resultList = [];
    var offset = 0;
    // [MEMO] offsetはレコードスキップする値。
    // しかし、offsetに0を指定するとエラーになる、1以上の場合にセット
    if (offset) {
      condition.offset = offset;
    }

    console.log('SObjectStore fetch:', JSON.stringify(condition));

    // 終了条件
    var isStop = function() {
      return results.length === 0;
    };

    var parseToObject = function(input) {
      var output = {};
      colList.forEach(function(key) {
        output[key] = input.get(key);
      });
      return output;
    };

    return new Promise(function(resolve, reject) {
      var fetchLoop = function() {
        dataStore.retrieve(condition, function(err, results, e) {
          if (err) {
            // [TODO]エラー通知もっとしっかり
            console.error('エラー発生', err);
            reject(err);
            return;
          }
          if (results.length === 0) {
            resolve(resultList);
            return;
          }
          results.map(parseToObject).forEach(function(row, index) {
            console.log(index, row);
            resultList.push(row);
          });
          condition.offset = condition.offset ? condition.offset + condition.limit : condition.limit;
          fetchLoop();
        });
      };

      fetchLoop();

    });

  };

  window.Flect_SObjectStore = new SObjectStore();

})();
