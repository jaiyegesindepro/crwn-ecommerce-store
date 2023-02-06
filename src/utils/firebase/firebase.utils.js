import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBl44sDTPvaJCGotTNTfa7Dud5xcmsvbms",
    authDomain: "crwn-ecommerce-store-db.firebaseapp.com",
    projectId: "crwn-ecommerce-store-db",
    storageBucket: "crwn-ecommerce-store-db.appspot.com",
    messagingSenderId: "689104598687",
    appId: "1:689104598687:web:35bdae5311483ad4f354aa"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup (auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef  = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
            });
        }catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
  };