import schema from './schema.js';
import mutations from './mutations.js';
import resolvers from './resolvers.js';
import { createCollection } from 'meteor/vulcan:core';

/**
 * @summary The global namespace for Wires.
 * @namespace Comments
 */
const Wires = createCollection({

  collectionName: 'wires',

  typeName: 'Wire',

  schema,

  resolvers,

  mutations,

});

export default Wires;
