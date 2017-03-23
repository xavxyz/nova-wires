Package.describe({
  name: "xavcz:vulcan-wires",
  version: "1.3.0",
});

Package.onUse( function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'vulcan:core@1.3.0',
    'vulcan:users@1.3.0',
    'vulcan:email@1.3.0',
    'vulcan:notifications@1.3.0',
  ]);

  api.mainModule('client.js', ['client']);
  api.mainModule('server.js', ['server']);

  api.addAssets([
    'lib/emails/newWire.handlebars',
  ], ['server']);
});
