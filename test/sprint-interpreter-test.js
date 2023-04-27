const {run} = require("../src/interpreter.js");
const {deepEqual} = require("assert");
const {describe, it} = require("node:test");  

describe("interpreter", function() {
  it("should assign value to a chell", function() {
    deepEqual(
      [0, 5, 4, 9, 5],
      run([0, 5, 4, 9]).slice(0, 5)
    );
  });
});

/*
  it("should compile multiple instructions", {
    expected: 59,
    actual: compile([0, 45, 100, 0, 59, 100])[100]
  });

  it("should add values of two cells and store to a cell", {
    fnName: fnName,
    expected: 5,
    actual: compile([
      0, 2, 100, 
      0, 3, 101, 
      1, 100, 101, 102
    ])[102]
  });

  it("should subtract values of two cells and store to a cell", {
    fnName: fnName,
    expected: 2,
    actual: compile([
      0, 5, 100, 
      0, 3, 101, 
      2, 100, 101, 102
    ])[102]
  });

  it("should subtract values of two cells and store to a cell", {
    fnName: fnName,
    expected: 2,
    actual: compile([
      0, 5, 100,
      0, 3, 101,
      2, 100, 101, 102
    ])[102]
  });

  it("should halt the program", {
    fnName: fnName,
    expected: 2,
    actual: compile([
      9
    ])[102]
  });

  it("should jump to specific cell", {
    fnName: fnName,
    expected: 2,
    actual: compile([
      3, 6,
      0, 5, 100,
      0, 3, 101,
      9
    ])[102]
  });
  */
