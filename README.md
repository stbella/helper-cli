## HELPER-CLI

#### 安装方法
1. 全局安装`npm i -g @bestjarvan/helper-cli --registry https://nexus.primecare.top/repository/npm-public/`
2. 项目安装`npm i --save-dev @bestjarvan/helper-cli --registry https://nexus.primecare.top/repository/npm-public/`


#### 使用方法
1. 全局安装使用方法:
  a. `helper-cli jenkins|jk`初始化jenkins配置
  b. `helper-cli deploy|dp <name> [branch]`发布\<name>的[branch]分支(可选，默认test分支)到test环境
  b. `helper-cli open|o <project> [env]`在默认浏览器中打开\<project>的[env]环境(可选，默认test环境)的地址
  c. `helper-cli -h`获取更多帮助

2. 项目安装使用方法:
  a. 添加脚本到`package.json`, 用法和全局安装一致
  b. 使用npx运行脚本, 例如: `npx helper-cli -h`

#### 版本说明

|version| remark                      | date       |
| :---: | :-------------------------: | :--------: |
| 0.0.1 | 支持自定义配置jenkins账号      | 2023.09.04 |
| 0.0.2 | 支持自动插入脚本到package.json | 2023.09.06 |
| 0.0.3 | 支持打开各个环境的项目地址      | 2023.09.06 |


![img](https://fastly.jsdelivr.net/gh/BestJarvan/pic-imgs/imgs/202308312004869.png)

## 测试推送