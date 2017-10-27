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

function defaultIt(activeEditor, edit) {
  const selectedText = getSelectedText(activeEditor);

  const mappedTypes = mapTypes(selectedText);
  const stringified = stringifyObject(mappedTypes);

  const insertPosition = activeEditor.selection.end.translate(3);
  edit.insert(insertPosition, stringified);
}

exports.activate = () => {
  vscode.commands.registerTextEditorCommand('extension.defaultIt', defaultIt);
}
