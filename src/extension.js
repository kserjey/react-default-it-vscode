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

function stringifyObject(obj) {
  const json = JSON.stringify(obj, undefined, 2);
  return json.replace(/\"/g, "");
}

function getSelectedText(editor) {
  const { start, end } = editor.selection;
  const selectionRange = new vscode.Range(start, end);
  return editor.document.getText(selectionRange);
}

function insertTo(editor, text, numberOfLines = 0, location = editor.selection.end) {
  editor.edit((builder) => {
    const newLines = Array(numberOfLines).join('\n');
    builder.insert(location, `${newLines}${text}`);
  }).then(() => {
    const selectionStart = new vscode.Position(location.line + numberOfLines - 1, 0);
    const selectionEnd = editor.selection.end;
    editor.selection = new vscode.Selection(selectionStart, selectionEnd);
  })
}

function mapTypes(propTypes) {
  const parsed = {};

  let match = regex.exec(propTypes);
  while (match !== null) {
    const [, key, type] = match;
    parsed[key] = defaultMapper[type];
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

  const mappedTypes = mapTypes(selectedText);
  const stringified = stringifyObject(mappedTypes)

  insertTo(activeEditor, stringified, 3);
}

exports.activate = () => {
  vscode.commands.registerCommand('extension.defaultIt', defaultIt);
}
