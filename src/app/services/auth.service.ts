import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
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

    await addDoc(collection(this.firestore, 'users'), this.UserData);
    this.router.navigate(['/home']);
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    this.UserData = result.user;
    this.router.navigate(['/home']);
  }

  async loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    this.UserData = result.user;
    this.router.navigate(['/home']);
  }

  async logout() {
    await signOut(this.auth);
    this.UserData = null;
    this.router.navigate(['/']);
  }
}
