/**
 * @summary Wires schema
 * @type {Object}
 */
 
// the current user is either the sender or the recipient
const involvedIn = ({_id},{senderId, recipientId}) => _id === senderId || _id === recipientId;
 
const schema = {
  _id: {
    type: String,
    viewableBy: involvedIn,
  },
  createdAt: {
    type: String,
    viewableBy: involvedIn,
  },
  body: {
    type: String,
    viewableBy: involvedIn,
    control: 'textarea',
    insertableBy: ['members'],
  },
  htmlBody: {
    type: String,
    viewableBy: involvedIn,
  },
  senderId: {
    type: String,
    viewableBy: involvedIn,
    resolveAs: 'sender: User',
  },
  recipientId: {
    type: String,
    viewableBy: involvedIn,
    insertableBy: ['members'],
    resolveAs: 'recipient: User',
  },
};

export default schema;
