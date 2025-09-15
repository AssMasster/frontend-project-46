import fs from 'fs'
import path from 'path'

const getFileFormat = (fileName) => {
  const extension = path.extname(fileName).toLowerCase()
  return extension.slice(1)
}

export const parseFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath)
  const fileContent = fs.readFileSync(absolutePath, 'utf8')
  const format = getFileFormat(filepath)
  switch (format) {
    case 'json':
      return JSON.parse(fileContent)

    default:
      throw new Error (`Unsupported file format: ${format}`)
  }
}

export const getFilesData = (filepath1, filepath2) => {
  const data1 = parseFile(filepath1)
  const data2 = parseFile(filepath2)
  return { data1, data2 }
}
