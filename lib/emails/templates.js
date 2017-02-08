import NovaEmail from 'meteor/nova:email';

NovaEmail.addTemplates({
  newWire: Assets.getText("lib/emails/newWire.handlebars"),
});
