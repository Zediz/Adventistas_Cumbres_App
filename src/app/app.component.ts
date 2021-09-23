import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { NosotrosPage } from './nosotros/nosotros.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'alert-circle'
    },
    {
      title: 'Nosotros',
      url: '/nosotros',
      icon: 'home'
    },
    {
      title: 'Oracion',
      url: '/oracion',
      icon: 'heart'
    },
    {
      title: 'Meditaciones',
      url: '/meditaciones',
      icon: 'book'
    },
    {
      title: 'En vivo',
      url: '/envivo',
      icon: 'logo-youtube'
    },
    {
      title: 'Registro Asistencia',
      url: '/registro-asistencia',
      icon: 'walk'
    },
    {
      title: 'Admin',
      url: '/admin',
      icon: 'cog'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

}
