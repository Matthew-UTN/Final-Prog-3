import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonaInterface } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class DataapiService {
  url:string = 'http://localhost:9001/api/v1/persona/';

  constructor(private http:HttpClient) {

  }

  getAll() : Observable<PersonaInterface[]>{
    return this.http.get<PersonaInterface[]>(this.url);
  }

  getOne(id:number) : Observable<PersonaInterface>{
    return this.http.get<PersonaInterface>(this.url+id);
  }

  delete(id:number) : Observable<any>{
    return this.http.delete(this.url+id);
  }

  post(persona:PersonaInterface) : Observable<PersonaInterface>{
    return this.http.post<PersonaInterface>(this.url, persona);
  }

  put(id:number, persona:PersonaInterface) : Observable<PersonaInterface>{
    return this.http.put<PersonaInterface>(this.url+id, persona);
  }

}