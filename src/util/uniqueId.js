/**
 * [exports description]
 * 2017年07月24日11:09:19
 * created by samli
 * for unique id for tool
 */
module.exports = uniqueId;

var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
};
