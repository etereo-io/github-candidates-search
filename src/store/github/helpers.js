export function buildQueryString(queryParams) {
  let qs = ' '
  Object.keys(queryParams).forEach((param) => {
    const paramToStr = `${param}:${queryParams[param]}`
    if (qs.length > 0) {
      qs += `+${paramToStr}`
    } else {
      qs += queryParams[param]
    }
  })
  return qs
}

export function countItems(items, prop) {
  return items.filter(item => item.type === prop).length
}

export function mergeUsersAndEvents(tmpUsers, events) {
  const users = []
  tmpUsers.forEach((user, index) => {
    if (user.login === events[index].login) {
      users.push({ ...user, eventsData: events[index] })
    }
  })
  return users.sort((a, b) => a.eventsData.pullRequests - b.eventsData.pullRequests).reverse()
}
