const omitPrivate = (_, obj) => {
  delete obj.__v
  return obj
}

module.exports = {
  omitPrivate
}