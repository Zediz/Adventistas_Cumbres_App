import { HTTP } from '@ionic-native/http/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingComponent } from '../components/loading/loading.component';
import { AngularFirestoreDocument, AngularFirestore} from '@angular/fire/firestore';


export interface Church {
  church:boolean;
}
@Component({
  selector: 'app-meditacion',
  templateUrl: './meditacion.page.html',
  styleUrls: ['./meditacion.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MeditacionPage implements OnInit {

  constructor(private activatedRoute : ActivatedRoute, 
    private http : HTTP, private navCtrl: 
    NavController, private sanitizer : DomSanitizer,
    private afs : AngularFirestore) { 

    this.afs.collection('Flags').doc<Church>('unico').valueChanges().subscribe(res=>{
      this.church = res.church;
    })
  }

  ngOnInit() {
    this.postId = this.activatedRoute.snapshot.paramMap.get("postId");
    this.backCategory = this.activatedRoute.snapshot.paramMap.get("back");
    this.getPost();
  }


  public churchValues : AngularFirestoreDocument <Church> ;

  public church = false;
  
  private postId ='';
  private backCategory;
  private soundCloud :any = this.sanitizer.bypassSecurityTrustResourceUrl('');
  private post :any = {
    content:{
      rendered:'',
    },
    title: {
      rendered:''
    }
  }

  public loading = true;

  getPost(){
    let postUrl = 'https://www.meditacionesdiarias.com/wp-json/wp/v2/posts/'+this.postId;

    this.http.get(postUrl,{},{}).then(res=>{
      console.log("Imprimiendo");
      res.data.replace('\\', '');     
      let json = JSON.parse(res.data);
      console.log(json);
      this.post = json;
      this.soundCloud = this.getSoundCloud(this.post.content.rendered);
      this.loading = false;
    }).catch(err=>{
      console.log(err);
    });


  }

  back(){
    console.log(this.navCtrl.back());
    console.log('Ya fuimos atras');
  }

  getSoundCloud(content:string){
    content = content.substring(content.indexOf('<iframe'), content.indexOf('</iframe>') + 9);
    
    content = content.substring(content.indexOf('src="') + 5 , content.indexOf('&amp;'));
    console.log(content);
    content += '&amp;show_teaser=false&amp;auto_play=true';
    return this.sanitizer.bypassSecurityTrustResourceUrl(content);
    
  }

  getImage(content:string){
    content = content.substring(content.indexOf('<img'), content.length);
    content = content.substring(content.indexOf('<img'), content.indexOf('</p>') );
    if(content.includes('.png')){
      content = content.substring(content.indexOf('src=')+5, content.indexOf('.png')+4);
    }else if(content.includes('.jpg')){
      content = content.substring(content.indexOf('src=')+5, content.indexOf('.jpg')+4);
    } else if(content.includes('.jpeg')){
      content = content.substring(content.indexOf('src=')+5, content.indexOf('.jpeg')+5);
    }else{
      content = 'assets/image_not_available.png';
    }
    return content;
  }

  getText(content: string){

    if(content.includes('</iframe>')){
      content = content.substring(content.indexOf('</iframe>')+9,content.length);
    }

    let imgTag = content.substring(content.indexOf('<img'), content.length);
    imgTag = imgTag.substring(0, imgTag.indexOf('/>')+2);

    console.log(imgTag);

    content = content.replace(imgTag,'');

    console.log(content);
    return content;
  }

  getTitle(title:string){
    title = title.replace('TEXTO CLAVE','');
    return title;
  }

  thereIsSound(content:string){
    return content.includes('soundcloud');
  }


    
    

  


}
