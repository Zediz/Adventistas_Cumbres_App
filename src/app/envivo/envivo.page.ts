import { Component, OnInit } from '@angular/core';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

export interface Video{
  title:string;
  active:boolean;
  imgUrl:string;
  message:string;
  subtitle:string;
  type:string;
  youtubeUrl:string;
}

@Component({
  selector: 'app-envivo',
  templateUrl: './envivo.page.html',
  styleUrls: ['./envivo.page.scss'],
})
export class EnvivoPage implements OnInit {

  constructor(private youtube: YoutubeVideoPlayer, private afs: AngularFirestore) { }

  public videoData: Video = {
    title:'',
    active:true,
    imgUrl:'',
    message: '',
    subtitle:'',
    type:'',
    youtubeUrl:''
  }

  ngOnInit() {
    this.afs.collection('pasto-section').valueChanges().subscribe(data=>{
      console.log("Si se cambio en web");
      data.map((vid: Video) =>{
        this.videoData = vid;
        //console.log(vid.title);
        this.playVideo();
      })
    });


  }


  playVideo(){
    console.log("Imprimiendo ID");
    let videoId = '';

    
    if(this.videoData.youtubeUrl.includes('https://youtu.be')){
      
      videoId = this.videoData.youtubeUrl.substr(17);
      videoId.replace('/','');
    }else if(this.videoData.youtubeUrl.includes('https://www.youtube.com/')){
    
      let v = this.videoData.youtubeUrl.indexOf('?v=');
      
      videoId = this.videoData.youtubeUrl.substr(v+3);
      v = videoId.indexOf('&');
      videoId = videoId.substr(0,v);
      
    }
    //https://youtu.be/b5ZjH1E_c8s
    //https://www.youtube.com/watch?v=mg7FweYjasE&ab_channel=CosmoSapiens
    this.youtube.openVideo(videoId);
  }
  



}
