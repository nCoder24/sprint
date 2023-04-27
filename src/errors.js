const errors = {
  unknownInstruction: function(instruction) {
    return "unknown instruction: " + instruction;
  },
  emptyCellReference: function(cellNo) {
    return "empty cell reference: " + cellNo;
  }
};

const throwErr = function(error) {
  console.error(error);
  process.exit(1);
};


exports.throwErr = throwErr;
exports.errors = errors;
