var editATS = require('cordovax-edit-ats');

module.exports = function(context) {
  if (context.opts.cordova.platforms.includes('ios')) {
    editATS('create_false', context.opts.projectRoot);
  }
};
