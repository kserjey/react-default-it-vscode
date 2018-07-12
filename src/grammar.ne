expression -> _ shape _  {% d => d[1] %}
shape -> "{" _ pair (_ "," _ pair):* _ "}" {% extractObject %}
pair -> string _ ":" _ string {% ([key,,,,value]) => [key.join(''), value.join('')] %}

_ -> null | [\s]:+ {% () => null %}
string -> [\w]:+ {% id %}

@{%
const pairToObject = ([key, value]) => ({ key: value })

function extractObject(d) {
  const [firstKey, firstValue] = d[2];
  return d[3].reduce(
    (acc, [,,,[key, value]]) => ({ ...acc, [key]: value }), 
    { [firstKey]: firstValue }
  );
}
%}
