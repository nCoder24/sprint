const {readFileSync, existsSync} = require("fs");
const {run} = require("./interpreter.js");
const {compile} = require("./compiler.js");
const {parse} = require("./parser.js");

const display = function(memory) {
  memory.forEach(function(cell) {
    process.stdout.write(`${(cell === null ? "" : `${cell}`).padStart(3)} | `);
  });
}

const main = function() {
  const file = process.argv[2];
  if(!existsSync(file)) {
    process.exit(1);  
  }
  const sourceCode = readFileSync(process.argv[2], "utf-8");

  display(run(compile(parse(sourceCode))));
}

main();
