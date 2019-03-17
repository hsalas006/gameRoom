const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://gameroom-3127e.firebaseio.com'
  });
  
  admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      // ...
    }).catch(function(error) {
      // Handle error
    });
  