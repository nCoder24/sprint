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

  it("should return undefined for any number not 0 as instruction", {
    fnName: fnName,
    expected: undefined,
    actual: compile([1, 45, 100])[100]
  });
}

testCompiler();

console.log(getReport());
