const util = require('util')
const fetch = require('node-fetch')
const parseString = require('xml2js').parseString
const parseXML = util.promisify(parseString)
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')

const BookType = new GraphQLObjectType({
  name: 'book',
  description: 'each book details',
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: json => json.title[0]
    },
    isbn: {
      type: GraphQLString,
      resolve: json => json.isbn[0]
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'author',
  description: '...',
  fields: () => ({
    name: {
      type: GraphQLString,
      resolve: json => json.GoodreadsResponse.author[0].name[0]
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: json => json.GoodreadsResponse.author[0].books[0].book
    }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'query',
    description: 'learning graphql',
    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: {
            type: GraphQLInt
          }
        },
        resolve: (root, args, context) => {
          return fetch(
            `https://www.goodreads.com/author/show.xml?id=${
              args.id
            }&key=w0SyZSfix4l6wjYkOfqlw`
          )
            .then(res => res.text())
            .then(parseXML)
        }
      }
    })
  })
})
