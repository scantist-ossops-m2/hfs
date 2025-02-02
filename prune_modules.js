const fs = require('fs')
const glob = require('fast-glob')
const { execSync } = require('child_process')
const dist = 'dist/'
const nm = 'node_modules/'

console.log('launching nm-prune') // must be run from this dir
const ya = dist + nm + 'yaml/dist/'
fs.renameSync(ya+'doc', ya+'do_c') // "hide" this folder from nm-prune
execSync('nm-prune --force -l', { cwd:'dist' })
fs.renameSync(ya+'do_c', ya+'doc')

process.chdir(dist)
console.log('more pruning')
for (const f of ['fswin/ia32', 'fswin/arm64', 'node-forge/dist', 'node-forge/flash', 'axios/lib', 'react', 'yaml/browser', 'limiter/dist/esm'])
    fs.rmSync(nm+f, {recursive:true})
for (const fn of glob.sync(['**/*.map', '**/*.tsbuildinfo', '**/*.bak', '**/*.ts', '**/license', '**/*.md']))
    fs.unlinkSync(fn)

console.log('pruning lodash')
fs.mkdirSync(nm+'lodash2')
fs.cpSync(nm+'lodash/package.json', nm+'lodash2/package.json')
fs.cpSync(nm+'lodash/lodash.min.js', nm+'lodash2/lodash.js')
fs.rmSync(nm+'lodash', {recursive:true})
fs.renameSync(nm+'lodash2', nm+'lodash')
