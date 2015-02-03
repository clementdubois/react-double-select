var ReactTools = require('react-tools');
var MAGIC = "/** @jsx ";
module.exports = {
  process: function(src) {
    if (src.slice(0, MAGIC.length) != MAGIC) return src;
    return ReactTools.transform(src);
  }
};