const operation = require("./operation.js");
const {errors} = require("./errors.js");
const {notStrictEqual} = require("assert");

const generateCells = function(noOfCells, fill = null){
  const cells = [];

  for(let count = 0; count < noOfCells; count++) {
    cells.push(fill);
  }

  return cells;
}

const extendMemory = function(existingMemory, totalSize = 50) {
  return [...existingMemory, ...generateCells(totalSize - existingMemory.length)]
}

const operatorFor = function(instruction) {
  const operations = {
    0: operation.assign,
    1: operation.add,
    2: operation.subtract,
    3: operation.jump,
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

const run = function(memory) {
  let state = {
    memory: extendMemory(memory),
    ip : 0,
    isHalted: false
  }

  while(!state.isHalted) {
    state = execute(state);
  }

  return state.memory;
}

const runWith = function(state) {
  if(state.isHalted) return state.memory;

  return runWith(execute(state));
}

const run = function(memory) {
  return runWith({meo});
}

exports.run = run;
