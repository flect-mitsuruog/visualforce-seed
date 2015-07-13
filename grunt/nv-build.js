module.exports = function(grunt, config) {
  var options = {
    options: {
      inputPath: '<%= config.paths.app %>/',
      outputPath: '<%= config.paths.dist %>/',
      apexPageFlags: config.apexPageFlags
    }
  };
  return options;
};
