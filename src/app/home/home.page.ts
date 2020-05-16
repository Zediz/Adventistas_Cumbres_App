import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public noticias:any[];
  public noticiasFinal:any;

  constructor(private http: HttpClient) {

  
    
}
  ngOnInit() {
    this.getJSON().subscribe(data =>{
      this.noticias = data.noticias;
      console.log(data.noticias);
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get<any>("assets/noticias.json");
}


  

}
