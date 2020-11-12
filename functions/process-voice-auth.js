exports.handler = async function(context, event, callback) {
  const voiceit2  = require('voiceit2-nodejs');
  const myVoiceIt = new voiceit2(context.VOICEIT_KEY, context.VOICEIT_TOKEN);

  const mapKey    = event.From.match(/(\d+)/)[0];
  const syncMap   = await require(Runtime.getFunctions()['sync-map'].path)(context, event);

  let user = await syncMap.get(mapKey);
  if(!user)
    return callback(null, "INVALID_USER");

  let { data } = user;

  if(!data.verificationId)
    data.verificationId = { [event.CallSid]: "pending" };
  else
    data.verificationId[event.CallSid] = "pending";

  await syncMap.set(mapKey, data);

  myVoiceIt.voiceVerificationByUrl({
    userId : data.voiceIt.userId,
    contentLanguage : "en-US",
    phrase : "Today is a nice day to go for a walk",
    audioFileURL : `${event.RecordingUrl}.wav`
  }, async (jsonResponse)=>{
    if(jsonResponse.status == 200)
      data.verificationId[event.CallSid] = "verified";
    else
      data.verificationId[event.CallSid] = "failed";
    await syncMap.set(mapKey, data);

    callback(null, data.verificationId[event.CallSid]);
  });
}
