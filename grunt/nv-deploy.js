module.exports = {
  dev: {
    options: '<%= credentials.dev %>',
    pkg: {
      staticresource: ['*'],
      apexpage: ['*']
    }
  },
  // sandbox: {
  //   options: '<%= credentials.sandbox %>',
  //   pkg: {
  //     staticresource: ['*'],
  //     apexpage: ['*']
  //   }
  // }
};
