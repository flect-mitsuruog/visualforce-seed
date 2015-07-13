module.exports = function(grunt, defaultConfig) {
  var options = {
    options: {
      inputPath: '<%= config.paths.app %>/',
      outputPath: '<%= config.paths.dist %>/',
      apexPageFlags: defaultConfig.config.apexPageFlags
    }
  };
  return options;
};
