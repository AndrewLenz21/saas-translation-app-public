'use client'
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from "@/firebase";
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

async function syncFirebaseAuth(session: Session) {
    if (session && session.firebaseToken) {
      try {
        await signInWithCustomToken(auth, session.firebaseToken);
      } catch (error) {
        console.error(`Error signing in with custom token :${error}`);
      }
    } else {
      auth.signOut();
    }
  }

function FirebaseAuthProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const {data:session} = useSession();
    
    useEffect(() => {
        if(!session) return;

        syncFirebaseAuth(session);
    },[session]);
  return (
    <>{children}</>
  )
}

export default FirebaseAuthProvider
