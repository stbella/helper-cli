const chalk = require("chalk");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { default: confirm } = require("@inquirer/confirm");
const { default: input } = require("@inquirer/input");

let url = "";
let answer = false;

const defaultJson = {
  symbol_url: "",
  save_dir: "./src/iconfont",
  use_rpx: true,
  default_icon_size: 18,
  screen_width: 375,
};

async function initIcon() {
  try {
    const data = fs.readFileSync(
      path.join(process.cwd(), "", "iconfont.json"),
      "utf8"
    );
    updateJson(data);
  } catch (error) {
    answer = await confirm({
      message: "未找到iconfont相关配置文件, 是否使用默认配置 ?",
      default: true,
    });
    if (answer) {
      updateJson(JSON.stringify(defaultJson));
    } else {
      // TODO: 支持添加自定义配置
    }
  }
}

async function updateJson(data) {
  const obj = JSON.parse(data);
  if (typeof obj !== "object") {
    throw new Error("iconfont.json文件格式错误, 请检查");
  }
  url = await input({ message: "Iconfont Symbol Url:" });
  url = url.trim();

  if (url.endsWith(".js")) {
    obj.symbol_url = url;

    initJson(obj);
  } else {
    console.log(chalk.red("请输入正确的url"));
  }
}

function initJson(data) {
  const json = JSON.stringify(data, null, "\t");
  fs.writeFileSync(path.join(process.cwd(), "iconfont.json"), json);

  runProcess(data);
}

function runProcess(obj) {
  const file = path.join(process.cwd(), obj.save_dir);
  exec(`rm -rf ${file}`, (error, stdout, stderr) => {
    if (error) {
      console.log(chalk.bgRed("Error:"), " removing files");
      return;
    }
    if (stderr) {
      console.log(chalk.bgRed("Error:"), " removing files");
      return;
    }
    console.log(chalk.bgGreen("Result:"), " delete files");

    exec(`npx bkicon-wechat`, (error, stdout, stderr) => {
      if (error) {
        console.log(chalk.bgRed("Error:"), " bkicon-wechat");
        return;
      }
      if (stderr) {
        console.log(chalk.bgRed("Error:"), " bkicon-wechat");
        return;
      }
      console.log(chalk.bgGreen("Result:"), " bkicon-wechat");
    });
  });
}

module.exports = initIcon;
