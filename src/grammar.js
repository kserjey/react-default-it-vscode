// Generated automatically by nearley, version 2.13.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const pairToObject = ([key, value]) => ({ key: value })

function extractObject(d) {
  const [firstKey, firstValue] = d[2];
  return d[3].reduce(
    (acc, [,,,[key, value]]) => ({ ...acc, [key]: value }), 
    { [firstKey]: firstValue }
  );
}
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "expression", "symbols": ["_", "shape", "_"], "postprocess": d => d[1]},
    {"name": "shape$ebnf$1", "symbols": []},
    {"name": "shape$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "pair"]},
    {"name": "shape$ebnf$1", "symbols": ["shape$ebnf$1", "shape$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "shape", "symbols": [{"literal":"{"}, "_", "pair", "shape$ebnf$1", "_", {"literal":"}"}], "postprocess": extractObject},
    {"name": "pair", "symbols": ["string", "_", {"literal":":"}, "_", "string"], "postprocess": ([key,,,,value]) => [key.join(''), value.join('')]},
    {"name": "_", "symbols": []},
    {"name": "_$ebnf$1", "symbols": [/[\s]/]},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": () => null},
    {"name": "string$ebnf$1", "symbols": [/[\w]/]},
    {"name": "string$ebnf$1", "symbols": ["string$ebnf$1", /[\w]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "string", "symbols": ["string$ebnf$1"], "postprocess": id}
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
