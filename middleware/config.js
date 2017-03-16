//node server listen 3000
const env = process.env.NODE_ENV

console.log('env: ',env)
if(env === 'production') {
  // 生产
  module.exports = {
    COOKIEDOAIM: 'oc.yunhuni.com',
    COOKIENAME: 'YUNHUNISESSIONID',
    JAVAAPI: 'http://rest.oc.internal.yunhuni.com',
    REDISHOST: 'p04a',
    REDISPORT: 6379
  }
}
else if (env === 'test') {
  module.exports = {
    // 测试
    COOKIEDOAIM: 'oc.yunhuni.cn',
    COOKIENAME: 'YUNHUNISESSIONID',
    JAVAAPI: 'http://rest.oc.internal.yunhuni.cn',
    REDISHOST: '10.163.3.165',
    REDISPORT: 16379
  }
}
else if (env === 'develop') {
  module.exports = {
    // 开发
    COOKIEDOAIM: 'oc.dev.yunhuni.com',
    COOKIENAME: 'YUNHUNISESSIONID',
    JAVAAPI: 'http://10.171.69.118:18082',
    REDISHOST: '10.162.199.238',
    REDISPORT: 6379
  }
}
else if (env === 'local') {
  module.exports = {
    // 本地
    COOKIEDOAIM: 'localhost',
    COOKIENAME: 'YUNHUNISESSIONID',
    JAVAAPI: 'http://api.oc.dev.yunhuni.com',
    REDISHOST: '192.168.20.130',
    REDISPORT: 6379
  }
}



