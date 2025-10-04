import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonRippleEffect,
  IonButton
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from '../../../environments/environment';
import { RippleButtonComponent } from '../../components/ripple-button/ripple-button.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonRippleEffect,
    IonButton,
    RippleButtonComponent,
  ]
})
export class LoginPage implements OnInit {
  private app: any;
  private auth: any;
  private firestore: any;

  email: string = '';
  password: string = '';

  constructor(private router: Router) {
    this.app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);

    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        console.log('User logged in:', user.uid);
        this.router.navigate(['/home']);
      } else {
        console.log('No user logged in');
      }
    });
  }

  ngOnInit() { }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async goToHome() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      await addDoc(collection(this.firestore, 'logs'), {
        uid: user.uid,
        timestamp: new Date(),
        action: 'Logged in'
      });

      console.log('Login successful:', user.uid);

      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Login failed:', error.message);
      alert('Login failed: ' + error.message);
    }
  }
}
