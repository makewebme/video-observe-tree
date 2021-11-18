// Main request method
const request = async (
  method,
  url,
  body,
) => {

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  }

  //
  // Body will be interpret as URL Params and attach to URL, or as FormData
  //

  let convertedParams = ''

  // Send as FormData, ...
  if (body && method !== 'GET') {
    if (body.isFile) {
      options.body = body.file
    } else {
      options.body = JSON.stringify(body)
    }

  // ... or as URL Params
  } else if (body) {
    if (body.params) {
      const { params } = body

      for (const key in clearEmptyParams(params)) {
        if (params !== '') convertedParams += '&'
        convertedParams += key + '=' + encodeURI(params[key])
      }

      convertedParams = convertedParams.slice(1)
      if (convertedParams) convertedParams = '?' + convertedParams
    }
  }

  // Optional Signal to cancel previous request
  if (body?.signal) options.signal = body.signal

  return fetch(process.env.REACT_APP_API_URL + url, options)
    .then((res) => res.json())
    .catch((err) => console.error(err))
}


// Remove empty params from URL to avoid things like param1=&param2=123
const clearEmptyParams = (params) => {
  const cleared = {}

  Object.keys(params).forEach((key) => {
    if (params[key] && key !== 'signal') {
      cleared[key] = params[key]
    }
  })

  return cleared
}


// GET
export const get = (url, params) =>
  request('GET', url, {
    params: params,
    signal: params?.signal,
  })

// POST
export const post = (url, body) =>
  request('POST', url, body)

// PUT
export const put = (url, body) =>
  request('PUT', url, body)


export default request
