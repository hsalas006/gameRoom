const admin = require('firebase-admin');

const serviceAccount = require('../../../gameroom-3127e-firebase-adminsdk-13fl3-e7d9af67b5.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://gameroom-3127e.firebaseio.com'
});

module.exports = (req, res, next) =>{
    const idToken = req.get('Authorization');

    if(!idToken){
        const error = new Error('Sin autenticacion.');
        error .statusCode = 401;
        throw error;
    }
    
    admin.auth().verifyIdToken(idToken)
        .then(decodedToken => {
            if (!decodedToken){
                const error = new Error('Usuario no autenticado.');
                error.statusCode = 401;
                throw error;
            }
            //var uid = decodedToken.uid;
            console.log(uid);
            req.userId = decodedToken.uid
            next();
            // ...
        }).catch(error => {
            // Handle error
            console.log(error);
            next(error);
        });
};