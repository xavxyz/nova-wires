import Users from 'meteor/nova:users';

const membersActions = [
  "wires.new", 
];

Users.groups.members.can(membersActions);
