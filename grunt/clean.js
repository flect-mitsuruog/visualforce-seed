module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= config.paths.dist %>/*',
        '!<%= config.paths.dist %>/.git*'
      ]
    }]
  }
};
