const { ApolloServer  } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectarDB = require('./config/db');
//const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });

// Conectar a la base de datos
conectarDB();

// servidor
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// arrancar el servidor
server.listen({ port: process.env.PORT || 4000 }).then( ({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
} )