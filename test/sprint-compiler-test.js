const test = require("../lib/test.js");
const sprint = require("../src/sprint-compiler.js");

const assertEqual = test.assertEqual;
const assertEqualArray = test.assertEqualArray;
const getReport = test.generateAssertionReport;
const assertEqualArrayOfArray = test.assertEqualArrayOfArray;

const compile = sprint.compile;

const it = function(message, testData) {
  assertEqual(testData.fnName, testData.actual, testData.expected, message);
}

const forArrayIt = function(message, testData) {
  assertEqualArray(testData.fnName, testData.actual, testData.expected, message);
}

const forArrayOfArrayIt = function(message, testData) {
  assertEqualArrayOfArray(testData.fnName, testData.actual, testData.expected, message);
}

const testCompiler = function() {
  const fnName = "compile";

  it("should assign value to a chell", {
    fnName: fnName,
    expected: 45,
    actual: compile([0, 45, 100])[100]
  });

  it("should compile multiple instructions", {
    fnName: fnName,
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
}

testCompiler();

console.log(getReport());
