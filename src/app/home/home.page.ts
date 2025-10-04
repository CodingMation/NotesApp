import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonList, IonItem, IonApp, IonMenuButton, IonButtons, IonMenuToggle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { environment } from '../../environments/environment';
import { ContainerComponent } from '../components/container/container.component';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonList, IonItem, IonApp, IonMenuButton, IonButtons, IonMenuToggle, ContainerComponent],
})

export class HomePage {
  private app: any;
  private auth: any;
  private firestore: any;

  userData: any = null;
  name: string = '';

  constructor(private menu: MenuController, private router: Router) {

    // this.menu.enable(true, 'main-menu');

    this.app = initializeApp(environment.firebaseConfig);
    this.auth = getAuth(this.app);
    this.firestore = getFirestore(this.app);

    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        // Wait for the Promise to resolve
        this.userData = await this.loadData(user.uid);

        // Now you can safely access the data
        console.log('User logged in:', user.uid, this.userData);

        // Example: set name if it exists
        if (this.userData) {
          this.name = this.userData.name || "No name found";
          console.log('User name:', this.name);
        }
      } else {
        console.log('No user logged in');
      }
    });
  }

  ngOnInit() { }

  async loadData(uid: string) {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  }

  goToHome() {
    console.log("Click for Go To Home");
  }

  async navigateAndClose(path: string) {
    await this.menu.close('main-menu');
    console.log('closed')
    this.router.navigate([path]);
  }
  async logout(path: string) { 
    await this.menu.close('main-menu');

    // this.router.navigate([path]);
  }
}
