const express = require('express')
const graphqlHTTP = require('express-graphql')

const app = express()
const schema = require('./schema')
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
)

app.listen(8000, () => {
  console.log(`running on port : 8000`)
})
