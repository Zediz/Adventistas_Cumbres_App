import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController, NavController, IonInput } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';


export interface Reg_Asistencia {  
      name: string;
      email: string;
      amountPeople:number;
      date?:string;
      phone:string;
      answerForm:boolean;
      contacted:boolean;
}

export interface Church {
  church:boolean;
}

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.page.html',
  styleUrls: ['./registro-asistencia.page.scss'],
})


export class RegistroAsistenciaPage implements OnInit {

  @ViewChild('emailInput',  {static: false}) emailInput: IonInput;

  constructor(private afs : AngularFirestore, 
              private alertCtrl: AlertController, 
              private router:Router) { 
                this.registrosValueChanges = afs.collection<Reg_Asistencia>('Registros_asistencia').valueChanges();
                this.registrosValueChanges.subscribe(regs=>{
                  console.log(regs);
                  let contador = 0;
                  regs.forEach(reg => {
                    contador += reg.amountPeople;
                  });

                  
                  this.cantidadAsistentes = contador;
                  console.log(contador);
                });

                this.afs.collection('Flags').doc<Church>('unico').valueChanges().subscribe(res=>{
                  this.church = res.church;
                })
              }

  ngOnInit() {
  }

  public registrosCollection: AngularFirestoreCollection <Reg_Asistencia>;

  public registrosValueChanges : Observable<Reg_Asistencia[]>;
  public cantidadAsistentes:number = 0;
  public churchValues : AngularFirestoreDocument <Church> ;

  public church = false;
  
  public registro:Reg_Asistencia ={
    name : '',
    email: '',
    amountPeople: 1,
    answerForm:false,
    contacted:false,
    phone:''
  }

  public lastRegistered = false;
  

  personasLabel(){
    let text = ' Persona';
    if(this.registro.amountPeople > 1){
      text = ' Personas';
    }
    return this.registro.amountPeople + text;
  }

  enviar_registro(){
    let today = new Date();
      this.registro.date = today.toDateString();

      if(this.checkForm()){
        if(this.cantidadAsistentes < 50){
          if(this.cantidadAsistentes + this.registro.amountPeople <= 50){
            this.afs.collection('Registros_asistencia').add(this.registro).then(res=>{
              this.registro = {
                name : '',
                email: '',
                amountPeople: 1,
                answerForm:false,
                contacted:false,
                phone:''
              }
              this.regSuccess();
            });
          }else{
            this.regFail2();
          }
        }else{
          this.regFail();
        }

      }
      

      
  }

  async regSuccess() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Registro Exitoso',
      message: 'El dia viernes se te enviará una encuesta. No olvides contestarla',
      buttons: ['Aceptar']
    });

    await alert.present();
    alert.onDidDismiss().then(res=>{
      this.router.navigateByUrl('home');
    })
  }

  async regFail() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'No se pudo registrar',
      message: 'Ya se han registrado 50 personas. El proximo Domingo empezará un nuevo registro. Te esperamos.',
      buttons: ['Aceptar']
    });

    await alert.present();
    alert.onDidDismiss().then(res=>{
      this.router.navigateByUrl('home');
    })
  }

  async regFail2() {

    let left = 50 - this.cantidadAsistentes;
    this.lastRegistered = true;
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'No se pudo registrar',
      message: 'Solo quedan ' + left + ' lugares, y estas solicitando '+ this.registro.amountPeople+ '.',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async badForm(message) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Datos Invalidos',
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
    
  }

  checkForm(){

    if(this.registro.name == ''){
      this.badForm('El campo nombre esta vacio.');
      return false;
    }

    if(this.registro.phone == ''){
      this.badForm('El campo celular esta vacio.');
      return false;
    }

    if(this.registro.email != ''){
      if(this.registro.email.includes('@')){
        return true;
      }else{
        this.emailInput.color = 'danger';
        this.badForm('Ingresa un email valido.');
        return false;
      }
    }else{
      this.badForm('El campo email esta vacio');
    }
    
  }



  



}
