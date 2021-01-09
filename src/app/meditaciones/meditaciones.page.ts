import { Router } from '@angular/router';
//import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HTTP } from '@ionic-native/http/ngx';
import { JsonPipe } from '@angular/common';


@Component({
  selector: 'app-meditaciones',
  templateUrl: './meditaciones.page.html',
  styleUrls: ['./meditaciones.page.scss'],
})
export class MeditacionesPage implements OnInit {

  constructor(private http: HTTP, private router:Router, private navCtrl : NavController) { }

  ngOnInit() {
    
  }

//CATEGORYS
//  Lección jóvenes         - 201
//  Matinal  adolescentes-   206
//  Desafío del Amor          - 140
//  Devoción familiar            -151

  public loading = false;

  public selectedCategory = '0';
  public categoryName = 'Meditaciones';
  public apiUrl ='https://www.meditacionesdiarias.com/wp-json/wp/v2/posts?categories=';

  public meditaciones :any = [];
  public categorias =[
    {
      id:'201',
      title:'Lección de Jóvenes',
      subtitle: 'Meditaciones Juveniles',
      image:'assets/categorys/leccion_jovenes.png',
      descripcion:'Escucha o lee la lección de escuela sabática para jóvenes.'
      

    },
    {
      id:'206',
      title:'Matinal de adolescentes',
      subtitle: 'Meditaciones Adolescentes',
      image:'assets/categorys/matinal_adolescentes.jpeg',
      descripcion:'Empieza el día en comunión con Dios, escucha o lee el matinal de adolecentes.'
    },
    {
      id:'140',
      title:'Desafío del amor',
      subtitle: 'Meditaciones para parejas',
      image:'assets/categorys/desafio_de_amor.jpg',
      descripcion:'Este desafío quiere brindarte la ayuda necesaria para mejorar tu relación de pareja, reconstruir tu relación de pareja, o bien prepararte para una nueva experiencia sentimental, todo esto basado en la palabra de DIOS, “La Biblia”'
    },
    {
      id:'151',
      title:'Devoción familiar',
      subtitle: 'Meditaciones para la familia',
      image:'assets/categorys/devocion_familiar.jpg',
      descripcion:'Encuentra temas y reflexiones interesantes para ese momento especial en tu devoción familiar. '
    }
  ]

  getMeditaciones(){
    this.http.get(this.apiUrl+this.selectedCategory,{},{}).then(res=>{
      console.log("Imprimiendo");
      res.data.replace('\\', '');     
      let json = JSON.parse(res.data);
      console.log(json);
      this.meditaciones = json;
      this.loading = false;
    }).catch(err=>{
      console.log(err);
    });
  }

  getImage(renderedData : string){

    let imageTag=renderedData.substring(renderedData.indexOf('<img'), renderedData.indexOf('/>')+2);

    if(imageTag.indexOf('jpg')>0){
      return imageTag.substring(imageTag.indexOf('src="')+5, imageTag.indexOf('.jpg"')+4 );
    }else if(imageTag.indexOf('png')>0){
      return imageTag.substring(imageTag.indexOf('src="')+5, imageTag.indexOf('.png"')+4 );
    }else if(imageTag.indexOf('jpeg')>0){
      return imageTag.substring(imageTag.indexOf('src="')+5, imageTag.indexOf('.jpeg"')+5 );
    }else{
      switch (this.selectedCategory) {
        case '201':
            return 'assets/categorys/leccion_jovenes.png';
          break;
        case '206':
            return 'assets/categorys/matinal_adolescentes.jpeg';
          break;
        case '140':
            return 'assets/categorys/desafio_de_amor.jpg';
          break;
        case '151':
            return 'assets/categorys/devocion_familiar.jpg';
          break;
      }
    }
    
    //console.log(renderedData.substring(renderedData.indexOf('<img'), renderedData.indexOf('/>')+2))
    //return renderedData.substring(0, renderedData.length - 1);
  }

  getExcerpt(rData){
    rData = rData.replace("[&hellip;]", "...");
    return rData.substring(4 , rData.length-5);
  }

  selectCategory(id:string, categoryName){
    this.selectedCategory = id;
    this.categoryName = categoryName;
    this.loading = true;
    this.getMeditaciones();
  }

  backToCategorys(){
    this.meditaciones = [];
    this.selectedCategory = '0';
    this.categoryName = 'Meditaciones';
    
  }

  goToPost(id){

   this.navCtrl.navigateForward(['/meditacion', id]);
    
  }

}
