var mock = require('../vendor/maf_mock.js');

module.exports = {
  getApplicationsByCategory: wrapMAFMethod(window.applicationManager.getApplicationsByCategory),
  getCategories: window.applicationManager.getCategories,
  getFeatured: wrapMAFMethod(window.applicationManager.getFeatured),
  getRecent: wrapMAFMethod(window.applicationManager.getRecent),
  getFavorites: wrapMAFMethod(window.applicationManager.getFavorites),
  getApp: wrapMAFMethod(window.applicationManager.getApp)
};

function wrapMAFMethod(method, category) {
  var modificationFunction = function (applicationData) {
    var modifiedApplicationData = {
      id: applicationData.id,
      name: applicationData.name,
      images: {
        icon: {
          '192x192': applicationData.images.icon['192x192'] ? './assets/images/app-icons/' + applicationData.images.icon['192x192'] : null
        }
      }
    };
    return modifiedApplicationData;
  }

  var wrappedMethod = function () {
    return method.apply(this, Array.prototype.slice.call(arguments).slice()).map(modificationFunction);
  }

  return wrappedMethod;
}
