import _ from 'lodash'

export default function plain (diff, parentPath = '') {
    function formatValue (value) {
        if (_.isArray(value) || _.isObject(value)) {
            return '[complex value]'
        }
        else if (_.isString(value)) {
            return `'${value}'`
        }
        else {
            return value
        }
    }
    const lines = diff
    .filter((node) => node.type !== 'unchanged')
    .flatMap((node) => {
        const currentPath = parentPath ? `${parentPath}.${node.key}` : node.key
        switch (node.type) {
            case 'added':
                return `Property '${currentPath}' was added with value: ${formatValue(node.value)}`;
            case 'removed':
                return `Property '${currentPath}' was removed`;
            case 'changed':
                return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
            case 'nested':
                return plain(node.children, currentPath)
        }
    })

    return lines.join('\n');
}