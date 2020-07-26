export function getAllMatchesForQuery (text, query, options = {}) {
  const  flags = `g${options.isCaseSensitive ? '' : 'i'}`
  const searchRegexp = new RegExp(query, flags)
  return [...text.matchAll(searchRegexp)]
}

export function randomUniqueString (prefix) {
  return Math.random().toString(36).replace('0.',prefix || '');
}