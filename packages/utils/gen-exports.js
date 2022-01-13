const fs = require('fs')

const getAllFiles = (path, ext = '')  =>  {
  return fs.readdirSync(path, {
    withFileTypes: true
  }).reduce((acc, cur) => {
    if (cur.isFile() && cur.name.endsWith(ext)) {
      acc.push(path + '/' + cur.name)
    } else if (cur.isDirectory()) {
      acc.push(...getAllFiles(path + '/' + cur.name))
    }
    return acc
  }, [])
}

const dirs = getAllFiles('./src', '.ts')

let content =  ''
dirs.forEach(item => {
  content += `export * from '${item.replace('.ts', '')}'\n`
})

fs.writeFile('./index.ts', content, (err) => {})