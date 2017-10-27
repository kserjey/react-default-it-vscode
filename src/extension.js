const vscode = require('vscode');

const defaultMapper = {
  bool: 'false',
  number: '0',
  string: "''",
  func: '() => {}',
  array: '[]',
  object: '{}'
};

const regex = new RegExp(/\s*(\w+):\s*PropTypes.(\w+)\s*,?/gi);

function getSelectedText(editor) {
  const { start, end } = editor.selection;
  const selectionRange = new vscode.Range(start, end);
  return editor.document.getText(selectionRange);
}

function parseTypes(propTypes) {
  const parsed = {};

  let match = regex.exec(propTypes);
  while (match !== null) {
    const [, key, type] = match;
    parsed[key] = type;
    match = regex.exec(propTypes);
  }

  return parsed;
}

function defaultIt() {
  const activeEditor = vscode.window.activeTextEditor;

  if (!activeEditor) {
    vscode.window.showInformationMessage('Open a file first to generate defaultProps');
    return;
  }

  const selectedText = getSelectedText(activeEditor);

  const parsedTypes = parseTypes(selectedText);
  const stringified = Object.entries(parsedTypes).reduce((acc, [key, value]) => (
    `${acc}, ${key}: ${defaultMapper[value]}`
  ), '');

  console.log(stringified);
  const insertPosition = activeEditor.selection.active.line + 2;
  vscode.activeTextEditor.edit((builder) => {
    builder.insert(insertPosition, `{ ${stringified} }`);
  })
}

exports.activate = () => {
  vscode.commands.registerCommand('extension.defaultIt', defaultIt);
}
