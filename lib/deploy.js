const Jenkins = require('jenkins')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const package = require('../package.json')

const auth = {}
let jobName = ''

let jenkins
let branchName = 'test'

function deploy (name, branch) {
  jobName = name
  if (branch) {
    branchName = branch
    initJenkins()
  } else {
    getGitBranch()
      .then(res => {
        branchName = res
        initJenkins()
      })
  }
}

async function initJenkins() {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../session', 'token.json'), 'utf8')
    Object.assign(auth, JSON.parse(data))
    try {
      jenkins = new Jenkins({
        baseUrl: `https://${auth.account}:${auth.token}@jenkins-test.primecare.top`,
      })
      triggerBuild()
    } catch (error) {
      console.log(error);
      process.exit(0)
    }
  } catch (error) {
    console.error(`配置文件未找到，请先运行 ${package.name} jk 生成配置文件`)
    process.exit(0)
  }
}


function getGitBranch() {
  return new Promise((resolve, reject) => {
    exec('git rev-parse --abbrev-ref HEAD', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject()
        return;
      }
      resolve(stdout.trim())
    })
  })
}

async function triggerBuild() {
  try {
    const result = await jenkins.job.build({
      name: jobName,
      parameters: {
        branch: branchName,
        merge: true
      },
      token: auth.token
    })
    console.log('准备构建...', result)
    waitOnQueue(result)
  } catch (error) {
    console.error('error: ', error);
  }
}

async function waitOnQueue(id) {
  const result = await jenkins.queue.item(id)
  if (result.executable) {
  console.log('开始构建: ', jobName);
    setTimeout(() => {
      logBuild(result.executable.number)
    }, 500);
  } else if (result.cancelled) {
    console.log('构建已取消')
  } else {
    setTimeout(() => {
      waitOnQueue(id)
    }, 500);
  }
}

function logBuild(id) {
  console.log('构建中...', id)
  const log = jenkins.build.logStream(jobName, id);

  log.on("data", (text) => {
    process.stdout.write(text);
  });

  log.on("error", (err) => {
    console.log("error", err);
  });

  log.on("end", () => {
    console.log("success: 构建完成.");
  });
}

module.exports = deploy