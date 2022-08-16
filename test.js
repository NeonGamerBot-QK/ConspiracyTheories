const fs = require('fs')
const path = require('path')
const folder = fs.readdirSync('node_modules').find(f => f == 'debug')
const p = path.join(__dirname, 'node_modules', folder, 'src', 'browser.js')
console.log(
  require('child_process').execSync(`npx browserify public/scripts/debug.js > public/scripts/debug.js`).toString()
  )