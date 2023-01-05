const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

var socksDB = [
  { name: "COCA", id: "1", exchangeId: "1" },
  { name: "META", id: "4", exchangeId: "1" },
  { name: "APPL", id: "5", exchangeId: "1" },
  { name: "BABA", id: "2", exchangeId: "2" },
  { name: "RBC", id: "3", exchangeId: "3" },
];

var exchangeDB = [
  { name: "NYSE", location: "USA", id: "1" },
  { name: "TSE", location: "Canada", id: "3" },
  { name: "CSE", location: "China", id: "2" },
];

const socks = new GraphQLObjectType({
  name: "Socks",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    exchange: {
      type: exchange,
      resolve(parent, args) {
        return _.find(exchangeDB, { id: parent.exchangeId });
      },
    },
  }),
});

const exchange = new GraphQLObjectType({
  name: "Exchange",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    socks: {
      type: new GraphQLList(socks),
      resolve(parent, args) {
        return _.filter(socksDB, { exchangeId: parent.id });
      },
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "rootQueryType",
  fields: {
    socks: {
      type: socks,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(socksDB, { id: args.id });
      },
    },
    exchange: {
      type: exchange,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(exchangeDB, { id: args.id });
      },
    },
    socks: {
      type: new GraphQLList(socks),
      resolve(parent, args) {
        return socksDB;
      },
    },
    exchange: {
      type: new GraphQLList(exchange),
      resolve(parent, args) {
        return exchangeDB;
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: rootQuery,
});
