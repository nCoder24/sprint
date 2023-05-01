const compile = function({memory, labels}) {
  const isLabelPattern = /[^0-9]/;

  return memory.map(function(cellValue) {
    if(isLabelPattern.test(cellValue)) return labels[cellValue];
    return cellValue;
  });
}

exports.compile = compile;
