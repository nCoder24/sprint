const fs = require("fs");

const tokenize = function(program) {
  const delemeter = /[ \n\t]{1,}/;
  return program.trim().split(delemeter);
}

const addLabel = (labels, lable) {
  return {...labels, ...label};
}

const parse = function(program) {
  const tokens = tokenize(program); 

  return tokens.reduce(function({labels, memory}, token) {
    if(/.*:/.test(token)) {
      const label = {};
      label[token.replace(":", "")] = memory.length;
      
      return {
        labels: {
          ...label,
          ...labels
        },
        memory
      };
    }

    return {
      labels,
      memory: [...memory, /[0-9]{1,}/.test(token) ? +token : token]
    };
  }, {labels: {}, memory: []});
}

exports.parse = parse;
