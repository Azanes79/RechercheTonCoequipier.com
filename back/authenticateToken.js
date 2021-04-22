const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

async function decodeIDToken(req, res, next) {
    if(req.headers.authorization) {
        const token = req.headers.authorization;
        if (token !== 'Bearer null' && token.startsWith('Bearer ')) {
            const idToken = token.split('Bearer ')[1];
            try {
                const decodedToken= await admin.auth().verifyIdToken(idToken);
                req['currentUser']= decodedToken;
            }catch (e) {
                console.log(err);
            }
        }
    }


    next();
}

module.exports = decodeIDToken;