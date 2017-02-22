# nova-wires 📧🐦

Allow your users to contact each others via email. 📧 

Like carrier pigeons *2.0*. 🐦

*Notes: At the moment, you have to manually specify the recipientId, see [#2](https://github.com/xavcz/nova-wires/issues/2) for some workarounds.*

## Rate limiting

#### `wireInterval`
Check that user waits more than X seconds between messages (wires). 

Default value: 60 secs.

#### `maxWiresPerDay`
Check that the user doesn't post more than Y messages (wires) per day. 

Default value: 3 per day.
