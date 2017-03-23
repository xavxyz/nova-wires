import Users from 'meteor/vulcan:users';

const membersActions = [
  "wires.new",
];

Users.groups.members.can(membersActions);
