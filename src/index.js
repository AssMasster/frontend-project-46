import { getFilesData } from '../parsers/parsers.js';
import buildDiff from './diffBuilder/index.js';
import format from '../formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const { data1, data2 } = getFilesData(filepath1, filepath2);
  const diff = buildDiff(data1, data2);
  return format(diff, formatName);
};

export default genDiff;
