const throwUnknownInstructionErr = function(instruction) {
  console.error("unknown instruction: ", instruction);
  process.exit(1);
}

const assign = function(cells, programCounter) {
  cells[cells[programCounter + 2]] = cells[programCounter + 1];
  return programCounter + 3;
}

const getOperation = function(instruction) {
  const operations = {
    0: assign
  }

  return operations[instruction] || throwUnknownInstructionErr(instruction);
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
