import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

type ProfileUpdates = {
  displayName : string;
  photoURL : string;
};

export async function fbsignUp(email :string, password : string){
  await auth().createUserWithEmailAndPassword(email, password)
}

export async function fbSignIn(email :string, password :string){
  await auth().signInWithEmailAndPassword(email, password)
}

export async function fbSignOut(){
  await auth().signOut()
}

export async function fbUpdateProfile(updates :ProfileUpdates){
  await auth().currentUser?.updateProfile(updates)
}

export function fbGoogleSignIn(){
  GoogleSignin.configure({
    webClientId: '934845959559-u76dhhdhtsbhnc5shvqg1v8j90lb638j.apps.googleusercontent.com',
  });
}