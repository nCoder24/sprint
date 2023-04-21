const error = {
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
  },

  jump: function(cells, programCounter) {
    return cells[programCounter + 1];
  },

  jumpEqual: function(cells, programCounter) {
    if(cells[programCounter + 1] === cells[programCounter]) return celss[programCounter + 1];
    else return programCounter + 4;
  }
}

const getOperation = function(instruction) {
  const operations = {
    0: operation.assign,
    1: operation.add,
    2: operation.subtract,
    3: operation.jump,
    4: operation.jumpEqual
  }

  return operations[instruction] || throwErr(error.unknownInstruction(instruction));
}

const execute = function(cells, programCounter) {
  return getOperation(cells[programCounter])(cells, programCounter);
}

const compile = function(program) {
  const cells = program.concat();
  let programCounter = 0;

  while(programCounter !== null && cells[programCounter] !== undefined) {
    programCounter = execute(cells, programCounter);
  }

  return cells;
}

exports.compile = compile;
