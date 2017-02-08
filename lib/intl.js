import { addStrings } from 'meteor/nova:core';

addStrings('en', {
  "wires.body": "Wire body",
  "wires.recipientId": "Recipient",
  "wires.created_message": "Your message has been sent!",
  "wires.rate_limit_error": "Please wait {value} seconds before sending a wire again.",
  "wires.max_per_day": "Sorry you cannot send more than {value} wires per day.",
});
