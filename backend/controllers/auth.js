const admin = require('firebase-admin');

const serviceAccount = require('../../../gameroom-3127e-firebase-adminsdk-13fl3-1b12e3bd87.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://gameroom-3127e.firebaseio.com'
});

module.exports = (req, res, next) =>{
    const token = req.get('Authorization');
    console.log(serviceAccount, 'serviceAccount>>>>>>>>>>>>');
    if(!token){
        const error = new Error('Sin autenticacion.');
        error.statusCode = 401;
        throw error;
    }
    console.log(token, 'token>>>>>>>>>>>>');
    admin.auth().verifyIdToken(token)
        .then(function(decodedToken) {
            console.log(decodedToken, '---------------')
            if (!decodedToken){
                const error = new Error('Usuario no autenticado.');
                error.statusCode = 401;
                throw error;
            }
            var uid = decodedToken.uid;
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