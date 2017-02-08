import marked from 'marked';
import { addCallback, Utils, getSetting } from 'meteor/nova:core';
import Telescope from 'meteor/nova:lib';
import Users from 'meteor/nova:users';
import Wires from './collection.js';


// ------------------ wires.new.validate ------------------------

const WiresValidateRateLimiting = (wire, currentUser) => {
  
  if (!Users.isAdmin(currentUser)) {

    const timeSinceLastWire = Users.timeSinceLast(currentUser, Wires);
    const numberOfWiresInPast24Hours = Users.numberOfItemsInPast24Hours(currentUser, Wires);
    const wireInterval = Math.abs(parseInt(getSetting('wireInterval', 60)));
    const maxWiresPer24Hours = Math.abs(parseInt(getSetting('maxWiresPerDay', 3)));
    
    // check that user waits more than X seconds between wires
    if(timeSinceLastWire < wireInterval)
      throw new Error(
        Utils.encodeIntlError({id: "wires.rate_limit_error", value: wireInterval - timeSinceLastWire})
      );
    
    // check that the user doesn't wire more than Y wires per day
    if(numberOfWiresInPast24Hours >= maxWiresPer24Hours)
      throw new Error(
        Utils.encodeIntlError({id: "wires.max_per_day", value: maxWiresPer24Hours})
      );
  }

  return wire;
  
};

addCallback('wires.new.validate', WiresValidateRateLimiting);


// ------------------ wires.new.sync ------------------------


const WiresNewSanitizeBody = (wire, currentUser) => ({...wire, htmlBody: Utils.sanitize(marked(wire.body))});

addCallback('wires.new.sync', WiresNewSanitizeBody);

const WiresNewAssignSender = (wire, currentUser) => ({...wire, senderId: currentUser._id});

addCallback('wires.new.sync', WiresNewAssignSender);

const WiresNewAssignCreatedAt = (wire, currentUser) => ({...wire, createdAt: new Date()});

addCallback('wires.new.sync', WiresNewAssignCreatedAt);


// ------------------ wires.new.async ------------------------


const WiresNewSendEmailAsync = wire => {
  
  const { senderId, recipientId, htmlBody } = wire;
  const { email: senderEmail, slug: senderSlug, displayName: senderName } = Users.findOne({_id: senderId});
  const { email: recipientEmail } = Users.findOne({_id: recipientId});
  
  const notificationData = {
    // email sender
    senderEmail,
    senderName,
    senderProfile: `${Utils.getSiteUrl()}users/${senderSlug}`,
    //email recipient
    recipientEmail,
    // email body
    htmlBody,
  };
  
  Telescope.notifications.create(recipientId, 'newWire', notificationData);
  
};

addCallback('wires.new.async', WiresNewSendEmailAsync);
