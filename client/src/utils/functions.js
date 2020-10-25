function isEmptyObj(object) {
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      return false;
    }
  }
}

function isEmptyObject(o) {
  return Object.keys(o).every(function (x) {
    return o[x] === '' || o[x] === null; // or just "return o[x];" for falsy values
  });
}
