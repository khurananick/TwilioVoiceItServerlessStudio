exports.handler = async function(context, event, callback) {
  setTimeout(function() {
    callback(null, { success: true });
  }, 8000);
}
