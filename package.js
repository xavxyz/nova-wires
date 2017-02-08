Package.describe({
  name: "xavcz:nova-wires",
  version: "1.0.0",
});

Package.onUse( function(api) {

  api.versionsFrom("METEOR@1.0");

  api.use([
    'nova:core@1.0.0',
    'nova:users@1.0.0',
    'nova:email@1.0.0',
  ]);

  api.mainModule('client.js', ['client']);
  api.mainModule('server.js', ['server']);

});