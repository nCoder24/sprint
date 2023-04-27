const operation = require("./operation.js");
const {errors} = require("./errors.js");
const {notStrictEqual} = require("assert");

const repeat = function(value, times) {
  const cells = [];

  for(let count = 0; count < times; count++) {
    cells.push(value);
  }

  return cells;
}

const allocateCells = function(noOfCells, initialValue = null){
  return repeat(initialValue, noOfCells);
}

const allocateMemeory = function(program, totalSize = 200) {
  return [...program, ...allocateCells(totalSize - program.length)]
}

const operatorFor = function(instruction) {
  const operations = {
    0: operation.assign,
    1: operation.add,
    2: operation.subtract,
    3: operation.jump,
    4: operation.jumpEqual,
    9: operation.halt,
  }

  notStrictEqual(
    operations[instruction], undefined, 
    errors.unknownInstruction(instruction)
  );

  return operations[instruction];
}

const execute = function(state) {
  const operator = operatorFor(state.memory[state.ip]);
  return operator(state);
}

const run = function(program) {
  let state = {
    memory: allocateMemeory(program),
    ip : 0,
    isHalted: false
  }

  while(!state.isHalted) {
    state = execute(state);
  }

  return state.memory;
}

exports.run = run;
