import { ApolloServer } from 'apollo-server-micro';
import mongoose from 'mongoose';
import { typeDefs } from '../../apollo/typeDefs.js';
import { resolvers } from '../../apollo/resolvers/index.js';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context(context) {
    return context;
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const mongodb = process.env.MONGODB;
const db = mongoose.connection;

if (db.readyState !== 1) {
  mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Database connected successfully!');
  });
} else {
  console.log('Database already connected!');
}

console.log(db.readyState);

export default apolloServer.createHandler({ path: '/api/graphql' });
