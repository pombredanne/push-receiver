const uuidv4 = require('uuid/v4');
const logger = require('../logger');
const registerGCM = require('./gcm');
const registerFCM = require('./fcm');
const storage = require('../store/storage.json');

// Should be unique by app - One GCM registration/token by app/appId
const appId = `wp:receiver.push.com#${uuidv4()}`;
// FIREBASE senderId link to your project
const senderId = storage.fcm.senderId;

logger.info(`Registration started for app : ${appId}`);

registerGCM(appId)
  .then(subscription => {
    logger.success('GCM registration complete');
    return registerFCM({ token : subscription.token, senderId, appId });
  })
  .then(() => logger.success('FCM registration complete'))
  .catch(error => logger.error(error.message));
