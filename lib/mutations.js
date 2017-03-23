import { newMutation, Utils } from 'meteor/vulcan:core';
import Users from 'meteor/vulcan:users';

const performCheck = (mutation, user, document) => {
  if (!mutation.check(user, document)) throw new Error(Utils.encodeIntlError({id: `app.mutation_not_allowed`, value: `"${mutation.name}" on _id "${document._id}"`}));
};

const mutations = {

  new: {

    name: 'wiresNew',

    check(user, document) {
      if (!user) return false;
      return Users.canDo(user, 'wires.new');
    },

    mutation(root, {document}, context) {

      performCheck(this, context.currentUser, document);

      return newMutation({
        collection: context.Wires,
        document,
        currentUser: context.currentUser,
        validate: true,
        context,
      });
    },

  },

};

export default mutations;
