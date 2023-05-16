import * as FIREBASE_ADMIN from 'thuongmaidientu-1211f-firebase-adminsdk-ctezk-3cc255f0e0.json'
import * as admin from 'firebase-admin';
const firebaseConfig = {
    credential: admin.credential.cert({
        clientEmail: FIREBASE_ADMIN.client_email,
        privateKey: FIREBASE_ADMIN.private_key,
        projectId: FIREBASE_ADMIN.project_id,
    }),
    databaseURL: 'https://thuongmaidientu-1211f-default-rtdb.firebaseio.com',
    storageBucket: 'thuongmaidientu-1211f.appspot.com',
}
const defaultApp = admin.initializeApp(firebaseConfig);
const defaultAuth = defaultApp.auth();
export {
    firebaseConfig,
    defaultApp,
    defaultAuth
}