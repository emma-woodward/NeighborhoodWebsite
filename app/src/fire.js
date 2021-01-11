import firebase from 'firebase';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDqmofXi4Ll61yITNznHcnNZYZJdgn1uxY",
    authDomain: "neighborhoodwebsite-41635.firebaseapp.com",
    projectId: "neighborhoodwebsite-41635",
    storageBucket: "neighborhoodwebsite-41635.appspot.com",
    messagingSenderId: "952831931998",
    appId: "1:952831931998:web:6245f046f9960e974626cf"
  };
  
const fire = firebase.initializeApp(firebaseConfig);

export const auth = fire.auth()

export default fire;