export function formatTime(time) {
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000

  if (diff < 60) {
    return '刚刚'
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return 'one day before'
  } else {
    return Math.ceil(diff / 86400) + '天前'
  }
}
