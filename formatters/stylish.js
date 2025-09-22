import _ from 'lodash';

export default function stylish(diff, depth = 1) {
  const makeIndent = (level) => ' '.repeat(level * 4 - 2);
  const makeBracketIndent = (level) => ' '.repeat(level * 4);

  const formatValue = (value, currentDepth) => {
    if (_.isObject(value) && !_.isArray(value)) {
      const nestedIndent = makeBracketIndent(currentDepth + 1);
      const closingIndent = makeBracketIndent(currentDepth);
      
      const lines = Object.entries(value).map(([key, val]) => {
        const valueIndent = makeBracketIndent(currentDepth + 1);
        return `${valueIndent}${key}: ${formatValue(val, currentDepth + 1)}`;
      });
      
      return `{\n${lines.join('\n')}\n${closingIndent}}`;
    }
    
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (value === '') return ' '; // ← ИСПРАВЛЕНО: пробел для пустых значений
    return String(value);
  };

  const lines = diff.map((node) => {
    const indent = makeIndent(depth);
    
    switch (node.type) {
      case 'nested':
        const nestedContent = stylish(node.children, depth + 1);
        const bracketIndent = makeBracketIndent(depth);
        return `${indent}  ${node.key}: {\n${nestedContent}\n${bracketIndent}}`;
      
      case 'added':
        return `${indent}+ ${node.key}: ${formatValue(node.value, depth)}`;
      
      case 'removed':
        return `${indent}- ${node.key}: ${formatValue(node.value, depth)}`;
      
      case 'changed':
        return [
          `${indent}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
          `${indent}+ ${node.key}: ${formatValue(node.newValue, depth)}`
        ].join('\n');
      
      default:
        return `${indent}  ${node.key}: ${formatValue(node.value, depth)}`;
    }
  });

  if (depth === 1) {
    return `{\n${lines.join('\n')}\n}`;
  }
  
  return lines.join('\n');
}