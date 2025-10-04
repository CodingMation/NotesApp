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
  IonRippleEffect
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from '../../../environments/environment';
import { RippleButtonComponent } from '../../components/ripple-button/ripple-button.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
    RippleButtonComponent
  ]
})
export class RegisterPage implements OnInit {
  private app: any;
  private auth: any;
  private firestore: any;

  email: string = '';
  password: string = '';
  name: string = '';

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

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async goToHome() {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      const user = userCredential.user;

      await addDoc(collection(this.firestore, 'users'), {
        uid: user.uid,
        name: this.name,
        email: this.email,
        createdAt: new Date()
      });

      console.log('User registered successfully:', user.uid);

      // Navigate to Home
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error registering user:', error.message);
    }
  }
}
