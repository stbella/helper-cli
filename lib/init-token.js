const chalk = require("chalk")
const figlet = require("figlet")
const path = require('path')
const fs = require('fs')
const { default: confirm } = require("@inquirer/confirm")
const { default: input } = require('@inquirer/input')

let account = "jiangyahui"
let token = "11841a57bee8a2aa1fc13f6ce28fe1233d"

async function initToken () {
  const answer = await confirm({ message: '初始化本地jenkins配置, 是否使用默认配置 ?', default: false });
  if (!answer) {
    account = await input({ message: 'jenkins账号:' })
    token = await input({ message: 'jenkins密码(token):' })
  }
  updatePkgFile()
  genTokenFile()
}

function updatePkgFile() {
  console.log(process.cwd())
  try {
    const pkgPath = path.join(process.cwd(), '', 'package.json')
    const data = fs.readFileSync(pkgPath, 'utf8')
    const obj = JSON.parse(data)
    if (!obj.scripts['deploy:jen']) {
      obj.scripts['deploy:jen'] = `helper-cli dp ${obj.name}`
      obj.scripts['init:jen'] = "helper-cli jk"
    }
    fs.writeFileSync(pkgPath, JSON.stringify(obj, null, '\t'))
    console.log('package.json添加脚本完成, 请检查项目名是否和jenkins匹配');
  } catch (error) {
    console.log('error: ', error);
  }
}

function genTokenFile () {
  try {
    fs.writeFileSync(path.join(__dirname, '../session', 'token.json'), `{ "account": "${account}", "token": "${token}" }`)
    console.log('jenkins配置初始化完成')
    console.log(
      chalk.green(
        figlet.textSync("SUCCESS", {
          font: "Soft",
          horizontalLayout: "default",
          verticalLayout: "default"
        })
      )
    );
  } catch (error) {
    console.error('error: ', error);
  }
}

module.exports = initToken
