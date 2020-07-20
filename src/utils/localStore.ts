export function setLocalStore (key: string, value: any, expire = 7 * 24 * 3600 * 1000) {
  const o = {
    value,
    time: new Date().getTime(),
    expire
  }
  localStorage.setItem(key, JSON.stringify(o))
}
export function getLocalStore (key: string, callback?: Function) {
  const str = localStorage.getItem(key)
  if (!str) {
    if (callback) {
      callback()
    }
    return null
  }
  const o = JSON.parse(str)
  if (o && ((new Date().getTime() - o.time) < o.expire)) {
    return o.value
  }
  return null
}
export function removeLocalStore (key: string) {
  localStorage.removeItem(key)
}
export function clearLocalStore () {
  localStorage.clear()
}
