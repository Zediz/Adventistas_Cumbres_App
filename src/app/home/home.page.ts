import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public noticias;
  public noticiasFinal:any;

  notis: Observable<string | null>;
  notisUrl: string = '';

  constructor(private http: HTTP, private storage: AngularFireStorage) {
    const ref = this.storage.ref('home.json');
    this.notis = ref.getDownloadURL();


    this.notis.toPromise().then(url=>{
      console.log("Url en promise");
      console.log(url);
      this.notisUrl = url;
      this.getJSON();
    }).catch(err=>{
      console.log(err);
    });
  
    
}
  ngOnInit() {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermission().then( result => {
      if (result.granted) {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: PushNotificationToken) => {
        //alert('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        //alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        //alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        //alert('Push action performed: ' + JSON.stringify(notification));
      }
    );



  }

  public getJSON(){
    console.log("Notis Url en Get JSON");
    console.log(this.notisUrl);
    this.http.get(this.notisUrl,{},{}).then(res=>{
      let json = JSON.parse(res.data);
      this.noticias= json.noticias;
    }).catch(err=>{
      console.log(err);
    });

}



  

}
