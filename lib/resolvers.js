import { GraphQLSchema } from 'meteor/nova:core';

const specificResolvers = {
  Wire: {
    sender(wire, args, context) {
      return context.Users.findOne({_id: wire.senderId}, { fields: context.getViewableFields(context.currentUser, context.Users) });
    },
    recipient(wire, args, context) {
      return context.Users.findOne({_id: wire.recipientId}, { fields: context.getViewableFields(context.currentUser, context.Users) });
    },
  },
};

GraphQLSchema.addResolvers(specificResolvers);

// root resolvers: basic list, single, and total query resolvers
const resolvers = {

  list: {

    name: 'wiresList',

    resolver(root, {terms}, context) {
      let {selector, options} = context.Wires.getParameters(terms);

      options.limit = (terms.limit < 1 || terms.limit > 10) ? 10 : terms.limit;
      options.skip = terms.offset;
      options.fields = context.getViewableFields(context.currentUser, context.Wires);

      return context.Wires.find(selector, options).fetch();
    },

  },
  
  single: {
    
    name: 'wiresSingle',
    
    resolver(root, {documentId}, context) {
      return context.Wires.findOne({_id: documentId}, { fields: context.getViewableFields(context.currentUser, context.Wires) });
    },
  
  },
};

export default resolvers;
