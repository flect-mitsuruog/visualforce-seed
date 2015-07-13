(function() {
  'use strict';

  var DataStore = window.Flect_SObjectStore;

  function initialize() {

    var keys = ['Id', 'Name'];
    var condition = {
      limit: 100,
      where: {
        IsActive: {
          eq: true
        }
      }
    };

    DataStore.fetch(new SObjectModel.User(), condition, keys)
      .then(function(data) {
        console.log(data);
      }).catch(function(err) {
        console.log(err);
      });

  }

  document.addEventListener('DOMContentLoaded', function(event) {
    initialize();
  });

})();
