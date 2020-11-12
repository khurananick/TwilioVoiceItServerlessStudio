# Pre-requisites
1. A VoiceIt account: https://voiceit.io/
2. A Twilio Sync Map: Can create one here https://www.twilio.com/console/api-explorer/sync

# Installation
1. Clone this repo.
2. Move `.env.sample` to `.env`
3. Add your credentials for `Twilio` and `VoiceIt` and add your `Sync SIDs`.
4. Deploy your serverless functions `twilio serverless:deploy`
5. Upload `studio.json` into a Studio Flow in your Twilio Account.
6. Update `GatherEnrollRecording` widget with your serverless domain.
7. Update `GatherAuthRecording` widget with your serverless domain.
8. Map `Sleep8Seconds` and `Sleep8SecondsB` widgets to `delay` function.
9. Map `VerifyVoiceAuth` to `verify-voice-auth` function.
10. Map `CheckIfEnrolled` to `find-voice-auth` function.

That's it, assign a number to your Studio flow and make a call.
- First time you call it, you can press 1 to enroll in voice auth. It will ask you to repeat a phrase 4 times.
- Second time you call it you can press 2 to authenticate and it will verify or fail.

<p align="center"><img src="./screenshots/studio.png?raw=true" /></p>
