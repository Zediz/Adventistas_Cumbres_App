import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,  } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';



export interface Pray     {  name: string;
                            motive: string;
                            type:string;
                            date:Date;
                          }

@Component({
  selector: 'app-oracion',
  templateUrl: './oracion.page.html',
  styleUrls: ['./oracion.page.scss'],
})
export class OracionPage implements OnInit {

  public collection;
  
  
  prays:Observable<Pray[]>;
  pray:Pray = {
    name:'',
    motive:'',
    type:'',
    date: new Date(Date.now())
  }


  constructor(private db : AngularFireDatabase, private alertController : AlertController) { 
    
    this.collection = this.db.list<Pray>('Peticiones');
    this.prays = this.db.list<Pray>('Peticiones').valueChanges();
    
  }

  ngOnInit() {
  }

  async alertPetition() {
    const alert = await this.alertController.create({
      header: 'Tu petición',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre (Opcional)'
        },
        {
          name: 'motive',
          type: 'textarea',
          placeholder: 'Petición'
        } 
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Confirm Ok');

            this.pray.type = 'P';
            this.pray.name= data.name;
            this.pray.motive = data.motive;
            this.pray.date = new Date(Date.now());

            console.log(this.collection);
            this.collection.push(this.pray);
          }
        }
      ]
    });

    await alert.present();
  }

  async alertGrateful() {
    const alert = await this.alertController.create({
      header: 'Tu agradecimiento',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre (Opcional)'
        },
        {
          name: 'motive',
          type: 'textarea',
          placeholder: 'Agradecimiento'
        } 
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            console.log('Confirm Ok');
            

            this.pray.type = 'A';
            this.pray.name= data.name;
            this.pray.motive = data.motive;
            this.pray.date = new Date(Date.now());

            this.collection.push(this.pray);

          }
        }
      ]
    });

    await alert.present();

  }


}