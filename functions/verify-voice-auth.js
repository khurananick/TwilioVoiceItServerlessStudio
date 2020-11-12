exports.handler = async function(context, event, callback) {
  const mapKey    = event.From.match(/(\d+)/)[0];
  const syncMap   = await require(Runtime.getFunctions()['sync-map'].path)(context, event);
  const user      = await syncMap.get(mapKey);

  if(user)
    if(user.data.verificationId)
      callback(null, user.data.verificationId[event.CallSid]);
}
