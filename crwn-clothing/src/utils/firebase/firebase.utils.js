import {initializeApp} from 'firebase/app'
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth'
import{
    getFirestore, 
    doc,
    getDoc,
    setDoc 
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCzzZwlzXSLCKYOCWxkYefkQEbjrW6eWgg",
    authDomain: "crwn-clothing-db-8e8c3.firebaseapp.com",
    projectId: "crwn-clothing-db-8e8c3",
    storageBucket: "crwn-clothing-db-8e8c3.appspot.com",
    messagingSenderId: "1003744840764",
    appId: "1:1003744840764:web:45097f80ce020c26020739"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider ()
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth= getAuth();
  export const signInWithGooglePopup = () => signInWithPopup (auth, googleProvider)
  export const signInWithGoogleRedirect =() => signInWithRedirect (auth, googleProvider) 
  export const db = getFirestore ()

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
    ) => {
    if(!userAuth) return;
    const userDocRef = doc ( db, 'users', userAuth.uid);
   

    const userSnapShot = await getDoc(userDocRef)
    

    if (!userSnapShot.exists()){
      const {displayName, email} = userAuth;
      const createAt = new Date();

      try {
        await setDoc (userDocRef,{
          displayName,
          email,
          createAt,
          ...additionalInformation
        });
      } catch (error) {
        console.log ('error creating the user', error.message)
      }
    }
    return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
  }