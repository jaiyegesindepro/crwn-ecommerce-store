import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup,GoogleAuthProvider, 
         createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, 
         onAuthStateChanged} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, 
         collection, writeBatch, query, getDocs } from 'firebase/firestore'

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

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup (auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect (auth, googleProvider);

  export const db = getFirestore();

  export const addCollectionAndDocument = async( collectionkey, objectsToAdd ) => {
    const collectionRef = collection(db, collectionkey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase())
      batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done')
  };

  export const getCategoriesAndDocuments = async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnashot = await getDocs(q);
    const categoryMap = querySnashot.docs.reduce((acc, docSnapShot) => {
      const { title, items } = docSnapShot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
      
    return categoryMap;
  }

  export const createUserDocumentFromAuth = async (
    userAuth, 
    ) => {

      if(!userAuth) return;

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

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword (auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword (auth, email, password);
  };

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callBack) => onAuthStateChanged(auth, callBack);