const error = {
  unknownInstruction: function(instruction) {
    return "unknown instruction: " + instruction;
  },
  emptyCellReference: function(cellNo) {
    return "empty cell reference: " + cellNo;
  }
}

const throwErr = function(error) {
  console.error(error);
  process.exit(1);
}

const operation = {
  assign: function(cells, programCounter) {
    cells[cells[programCounter + 2]] = cells[programCounter + 1];

    return programCounter + 3;
  },

  add: function(cells, programCounter) {
    const result = cells[cells[programCounter + 1]] + cells[cells[programCounter + 2]]
    cells[cells[programCounter + 3]] = result;

    return programCounter + 4;
  },

  subtract: function(cells, programCounter) {
    const result = cells[cells[programCounter + 1]] - cells[cells[programCounter + 2]]
    cells[cells[programCounter + 3]] = result;

    return programCounter + 4;
  }
}

const getOperation = function(instruction) {
  const operations = {
    0: operation.assign,
    1: operation.add,
    2: operation.subtract
  }

  return operations[instruction] || throwErr(error.unknownInstruction(instruction));
}

const execute = function(cells, programCounter) {
  return getOperation(cells[programCounter])(cells, programCounter);
}

const compile = function(program) {
  const cells = program.concat();
  let programCounter = 0;

  while(programCounter < program.length && programCounter !== null) {
    programCounter = execute(cells, programCounter);
  }

  return cells;
}

exports.compile = compile;
