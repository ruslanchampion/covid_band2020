function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import numeral from 'numeral';

export var sortData = function sortData(data) {
  var sortedData = [].concat(_toConsumableArray(data));
  sortedData.sort(function (a, b) {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};
export var prettyPrintStat = function prettyPrintStat(stat) {
  return stat ? "+" + numeral(stat).format("0.0a") : "+0";
};