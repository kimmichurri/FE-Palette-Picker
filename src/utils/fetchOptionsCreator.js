export const fetchOptionsCreator = (type, body) => ({
  method: type,
  body: JSON.stringify(body),
  headers:{
    'Content-Type': 'application/json'
  }
})