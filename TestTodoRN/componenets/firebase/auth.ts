import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';

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

// 회원탈퇴
export async function fbDeleteUser(){
  await auth().currentUser?.delete()
}


GoogleSignin.configure({
  webClientId: '934845959559-u76dhhdhtsbhnc5shvqg1v8j90lb638j.apps.googleusercontent.com',
});

export async function fbGoogleSignIn(){
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}
