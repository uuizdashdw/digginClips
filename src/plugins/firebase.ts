import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// FIREBASE_API_KEY="AIzaSyATWrSHA5dis9XshfFxN6GDFgbJdqWtLjk",
// FIREBASE_AUTH_DOMAIN="rocking-clip.firebaseapp.com"
// FIREBASE_PROJECT_ID="rocking-clip"
// FIREBASE_STORAGE_BUCKET="rocking-clip.firebasestorage.app"
// FIREBASE_MESSAGING_SENDER_ID="74299054527"
// FIREBASE_APP_ID="1:74299054527:web:a3ae343f4d1956f16e290a"
// FIREBASE_MEASUREMENT_ID="G-WB3XZDM931"
const firebaseConfig = {
	apiKey: 'AIzaSyATWrSHA5dis9XshfFxN6GDFgbJdqWtLjk',
	authDomain: 'rocking-clip.firebaseapp.com',
	projectId: 'rocking-clip',
	storageBuckect: 'rocking-clip.firebasestorage.app',
	appId: '1:74299054527:web:a3ae343f4d1956f16e290a',
	messagingSenderId: '74299054527',
	measurementId: 'G-WB3XZDM931',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
