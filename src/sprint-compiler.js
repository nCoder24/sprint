const getInstruction = function(instructionCode) {
  const instructions = {
    0: function(cells, programCounter) {
      cells[cells[programCounter + 2]] = cells[programCounter + 1];
      return programCounter + 3;
    }
  }

  return instructions[instructionCode];
}

const execute = function(cells, programCounter) {
  const operation = getInstruction(cells[programCounter])
  if (operation) return operation(cells, programCounter);
}

const compile = function(program) {
  const cells = program.concat();
  execute(cells, 0);

  return cells;
}

exports.compile = compile;
