const style = require("../lib/style.js");
const assertionLog = [];

const pushAssertion = function(fnName, actual, expected, message, isAssertionPassed) {
  assertionLog.push({fnName, actual, expected, message, isAssertionPassed});
}

const generateTestReport = function(isAssertionPassed, actual, expected, message) {
  const reportLines = [];

  reportLines.push((isAssertionPassed ? style.green("󰗡 ") : style.red(" ")) + message); 
  if(!isAssertionPassed) {
    reportLines.push(style.green("   expected: " + expected));
    reportLines.push(style.red("    actutal: " + actual));
  }

  return reportLines.join("\n");
}

const groupObjects = function(listOfObjects, key) {
  const groupedObject = {};

  for(const object of listOfObjects) {
    const groupKey = object[key];
    groupedObject[groupKey] = (groupedObject[groupKey] || []).concat(object);
  }

  return groupedObject;
}

const generateSummaryLine = function(assertions) {
  const totalCount = assertions.length;
  const passedCount = (groupObjects(assertions, "isAssertionPassed").true || []).length;

  return passedCount + "/" + totalCount + " passed";
}

const generateReports = function(assertions) {
  const reports = [];

  for(const assertion of assertions) {
    reports.push(generateTestReport(
      assertion.isAssertionPassed, 
      assertion.actual, 
      assertion.expected, 
      assertion.message
    ));
  }

  return reports.join("\n");
}

const generateGroupeTitle = function(assertions, message) {
  return style.headline(
    message + " (" + generateSummaryLine(assertions) + ")");
}

const generateGroupedReport = function(groupHeadline, assertions) {
  return groupHeadline + generateReports(assertions)
}

const generateGroupedByFnNameReport = function() {
  const allReports = [];
  const assertions = groupObjects(assertionLog, "fnName");

  for(const fnName in assertions) {
    const groupTitle = generateGroupeTitle(assertions[fnName], fnName);
    allReports.push(generateGroupedReport(groupTitle, assertions[fnName]));
  }

  return allReports.join("\n");
}

const generateAssertionReport = function() {
  const summary = style.bold("\nSummary : " + generateSummaryLine(assertionLog));

  return generateGroupedByFnNameReport() + "\n" + summary;
}

const areEqualArray = function(array1, array2) {
  if(array1.length !== array2.length) return false;

  let index = 0;

  while(index < array1.length) {
    if(array1[index] !== array2[index]) return false;
    index++;
  }

  return true;
}

const assertEqualArray = function(fnName, actualArray, expectedArray, message) {
  const isAssertionPassed = areEqualArray(actualArray, expectedArray);

  pushAssertion(fnName, actualArray, expectedArray, message, isAssertionPassed); 
}

const assertEqualArrayOfArray = function(fnName, actualArray, expectedArray, message) {
  let isAssertionPassed = false;

  if(actualArray.length === expectedArray.length) {
    for(const index in actualArray) {
      isAssertionPassed = areEqualArray(actualArray[index], expectedArray[index]);
      if(!isAssertionPassed) break;
    }
  }

  pushAssertion(fnName, actualArray, expectedArray, message, isAssertionPassed); 
}

const areEqualObject = function(object1, object2) {
  if(Object.keys(object1).length !== Object.keys(object2).length) return false;

  for(const key in object1) {
    if(object1[key] !== object2[key]) return false;
  }

  return true;
}

const assertEqualOjbect = function(fnName, actualOjbect, expectedOjbect, message) {
  const isAssertionPassed = areEqualObject(actualOjbect, expectedOjbect);

  pushAssertion(fnName, actualOjbect, expectedOjbect, message, isAssertionPassed); 
}

const assertEqual = function(fnName, actual, expected, message) {
  const isAssertionPassed = actual === expected;

  pushAssertion(fnName, actual, expected, message, isAssertionPassed);
}

exports.assertEqual = assertEqual;
exports.assertEqualArray = assertEqualArray;
exports.assertEqualObject = assertEqualOjbect;
exports.generateAssertionReport = generateAssertionReport;
exports.assertEqualArrayOfArray = assertEqualArrayOfArray;
