import firebase from 'firebase/app';
import 'firebase/storage';
import { firebaseConfig } from '../secrets/firebaseConfig';

try {
	firebase.initializeApp(firebaseConfig);
} catch (err) {
	// we skip the "already exists" message which is
	// not an actual error when we're hot-reloading
	if (!/already exists/.test(err.message)) {
		console.error('Firebase initialization error', err.stack);
	}
}

const fb = firebase;
export default fb;
