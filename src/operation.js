assign = function(state) {
  const memoryLocation = state.memory[state.ip + 2];
  const value = state.memory[state.ip + 1];
  const [...memory] = state.memory;

  memory[memoryLocation] = value;

  return {
    memory,
    ip: state.ip + 3,
    isHalted: false
  }
}

const halt = function(state) {
  return {
    memory: state.memory,
    ip: state.ip,
    isHalted: true
  }
}

add = function(state) {
  const operand1Loc = state.memory[state.ip + 1];
  const operand2Loc = state.memory[state.ip + 2];
  const resultLoc = state.memory[state.ip + 3];
  const [...memory] = state.memory;

  memory[resultLoc] = memory[operand1Loc] + memory[operand2Loc];

  return {
    memory,
    ip: state.ip + 4,
    isHalted: false
  }
}

subtract = function(state) {
  const operand1Loc = state.memory[state.ip + 1];
  const operand2Loc = state.memory[state.ip + 2];
  const resultLoc = state.memory[state.ip + 3];
  const [...memory] = state.memory;

  memory[resultLoc] = memory[operand1Loc] - memory[operand2Loc];

  return {
    memory,
    ip: state.ip + 4,
    isHalted: false
  }
}

jump = function(state) {
  const jumpLocation = state.memory[state.ip + 1];

  return {
    memory: state.memory,
    ip: jumpLocation,
    isHalted: true
  }
}

exports.assign = assign;
exports.add = add;
exports.subtract = subtract;
exports.jump = jump;
exports.jumpEqual;
exports.halt = halt;
