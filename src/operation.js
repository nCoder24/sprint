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

add = function(state) { }

subtract = function(state) { }

jump = function(state) { }

jumpEqual = function(state) { }

exports.assign = assign;
exports.add = add;
exports.subtract = subtract;
exports.jump = jump;
exports.jumpEqual;
exports.halt = halt;
