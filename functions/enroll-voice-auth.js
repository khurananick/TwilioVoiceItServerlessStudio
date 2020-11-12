exports.handler = async function(context, event, callback) {
  const voiceit2  = require('voiceit2-nodejs');
  const myVoiceIt = new voiceit2(context.VOICEIT_KEY, context.VOICEIT_TOKEN);

  const mapKey    = event.From.match(/(\d+)/)[0];
  const syncMap   = await require(Runtime.getFunctions()['sync-map'].path)(context, event);

  let user = await syncMap.get(mapKey);

  function enrollVoice(userId, RecordingUrl) {
    myVoiceIt.createVoiceEnrollmentByUrl({
      userId : userId,
      contentLanguage : "en-US",
      phrase : "Today is a nice day to go for a walk",
      audioFileURL : RecordingUrl
    },async (jsonResponse)=>{
      const data = { voiceIt: { userId: userId, enrollment: jsonResponse } };
      user = await syncMap.set(mapKey, data);
      callback(null, user);
    });
  }

  if(!user) {
    myVoiceIt.createUser(async (jsonResponse)=>{
      const { userId } = jsonResponse;
      enrollVoice(userId, `${event.RecordingUrl}.wav`);
    });
  }
  else {
    enrollVoice(user.data.voiceIt.userId, `${event.RecordingUrl}.wav`);
  }
}
