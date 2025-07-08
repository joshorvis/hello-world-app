// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut
} from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  getDoc
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public UserData: any = null;

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {}

  async login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    this.UserData = result.user;
    this.router.navigate(['/home']);
  }

  async register(userForm: any) {
    const { email, password, ...profile } = userForm;
    const result = await createUserWithEmailAndPassword(this.auth, email, password);
    this.UserData = { uid: result.user.uid, email, ...profile };

    await setDoc(doc(this.firestore, 'users', result.user.uid), {
      ...profile,
      email,
      method: 'email'
    });

    this.router.navigate(['/home']);
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    this.UserData = result.user;

    const nameParts = result.user.displayName?.split(' ') || [];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const userRef = doc(this.firestore, 'users', result.user.uid);
    const existing = await getDoc(userRef);
    if (!existing.exists()) {
      await setDoc(userRef, {
        firstName,
        lastName,
        email: result.user.email,
        method: 'google'
      });
    }

    this.router.navigate(['/home']);
  }

  async loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    this.UserData = result.user;

    const nameParts = result.user.displayName?.split(' ') || [];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const userRef = doc(this.firestore, 'users', result.user.uid);
    const existing = await getDoc(userRef);
    if (!existing.exists()) {
      await setDoc(userRef, {
        firstName,
        lastName,
        email: result.user.email,
        method: 'facebook'
      });
    }

    this.router.navigate(['/home']);
  }

  async logout() {
    await signOut(this.auth);
    this.UserData = null;
    this.router.navigate(['/']);
  }
}
