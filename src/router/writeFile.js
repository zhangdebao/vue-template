const Path = require('path')
const fs = require('fs')
function getllFile (path = '/src/views/', key) {
  const pathArray = Path.join(__dirname, path)
  const options = fs.readdirSync(pathArray)
  const router = []
  options.forEach(async (item, index) => {
    const path1 = Path.join(__dirname, `${path}/${item}`)
    const status = fs.statSync(path1)
    const route = {}
    const name = item.substring(0, item.indexOf('.'))
    Object.assign(route, {
      path: name,
      name,
      meta: {
        title: '任务列表',
        index: `${key ? (key + '-') : ''}${index + 1}`
      },
      disabled: true,
      component: () => import(path1)
    })
    if (status.isDirectory()) {
      const child = await getllFile(`${path}/${item}`, `${key ? (key + '-') : ''}${index + 1}`)
      route.child = child
    }
    router.push(route)
  })
  return router
}
function writerFile (str) {
  require('fs').writeFile('./src/router/index1.js', str, function (err) {
    if (err) {
      console.log('写入config.js置失败', err)
    } else {
      console.log('写入config.js配置成功')
    }
  })
}