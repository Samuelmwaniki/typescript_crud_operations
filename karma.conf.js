module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'src/*.js',   // Add your source files
      'test/*.js',  // Add your test files
    ],
    browsers: ['Chrome'],
    singleRun: true,
  });
};
