const assign = function({memory, ip, isHalted}) {
  const memoryLocation = memory[ip + 2];
  const value = memory[ip + 1];

  memory = [...memory];
  memory[memoryLocation] = value;

  return {
    memory,
    ip: ip + 3,
    isHalted: false
  }
}

const halt = function({memory, ip, isHalted}) {
  return {
    memory: memory,
    ip: ip,
    isHalted: true
  }
}

const add = function({memory, ip, isHalted}) {
  const operand1Loc = memory[ip + 1];
  const operand2Loc = memory[ip + 2];
  const resultLoc = memory[ip + 3];

  memory = [...memory];
  memory[resultLoc] = memory[operand1Loc] + memory[operand2Loc];

  return {
    memory,
    ip: ip + 4,
    isHalted
  }
}

const subtract = function({memory, ip, isHalted}) {
  const operand1Loc = memory[ip + 1];
  const operand2Loc = memory[ip + 2];
  const resultLoc = memory[ip + 3];

  memory = [...memory];
  memory[resultLoc] = memory[operand1Loc] - memory[operand2Loc];

  return {
    memory,
    ip: ip + 4,
    isHalted
  }
}

const jump = function({memory, ip, isHalted}) {
  const jumpLocation = memory[ip + 1];

  return {
    memory: memory,
    ip: jumpLocation,
    isHalted: true
  }
}

exports.assign = assign;
exports.add = add;
exports.subtract = subtract;
exports.jump = jump;
exports.halt = halt;
