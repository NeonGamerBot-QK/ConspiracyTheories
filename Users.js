const path = require('path')
const fs = require('fs')
let FILE_NAME = path.join(__dirname, 'users')
module.exports = class {
  constructor() {
    this.users = this._users()
  }
  _users () {
    return JSON.parse(Buffer.from(fs.readFileSync(FILE_NAME).toString(), 'base64').toString())
  }
  _save() {
    return fs.writeFileSync(FILE_NAME, Buffer.from(JSON.stringify(this.users)).toString('base64'), null, 2)
  } 
  saveUser(user) {
    this.users[user.email] = user;
    this._save()
  }
  getUsers() {
    const keys = Object.keys(this.users)
  return keys.map((email) => this.getUser(email))
  }
  getSize() {
  return Object.entries(this.users).length
  }
  getUser(email) {
return this.users[email];
  }
}