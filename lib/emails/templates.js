import NovaEmail from 'meteor/vulcan:email';

NovaEmail.addTemplates({
  newWire: Assets.getText("lib/emails/newWire.handlebars"),
});
