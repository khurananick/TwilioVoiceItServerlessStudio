module.exports = async function(context, event) {
  const client = context.getTwilioClient();
  const map = client.sync
                .services(context.SYNC_SERVICE_SID)
                .syncMaps(context.SYNC_MAP_SID);

  const Self = {
    get: async function(key) {
      return await map
                    .syncMapItems(key)
                    .fetch()
                    .catch(function(e) {
                      console.log(e);
                      return null;
                    });
    },
    set: async function(key, value, callback) {
      await Self.remove(key);
      const item = await map
                          .syncMapItems
                          .create({
                             key: key,
                             data: value
                           }).catch(function(e) {
                             console.log(e);
                           });
       return item;
    },
    remove: async function(key, callback) {
      return await map
                    .syncMapItems(key)
                    .remove()
                    .catch(function(e) { /* do nothing */ });
    }
  };

  return Self;
};

