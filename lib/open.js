const HOST_MAP = {
  picp: {
    test: 'https://admin-test.primecare.top/',
    pre: 'https://uat-admin.primecare.top/',
    prod: 'https://admin.primecare.top/'
  },
  helper: {
    test: 'https://web-test.primecare.top/#/',
    pre: 'https://uat-helper-web.primecare.top/#/',
    prod: 'https://helper.web.primecare.top/#/'
  },
  h5: {
    test: 'https://web-activity-test.primecare.top/#/',
    pre: 'https://uat-web-activity.primecare.top/#/',
    prod: 'https://web-activity.primecare.top/#/'
  },
}

async function open (project, env = 'test') {
  const { default: open } = await import('open')
  const url = HOST_MAP[project][env]
  open(url || HOST_MAP['picp']['prod'])
}

module.exports = open