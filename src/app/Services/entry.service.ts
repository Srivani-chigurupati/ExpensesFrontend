import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntryElement } from '../Interfaces/EntryElement';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  baseUrl:string = 'https://localhost:44370/api/Entries';
  
  //https://localhost:44370/api/Entries

  constructor(private http:HttpClient) { }

  getAllentries():Observable<EntryElement[]>{
    return this.http.get<EntryElement[]>(this.baseUrl);

  }

  getEntry(id:number):Observable<EntryElement>{
    return this.http.get<EntryElement>(`${this.baseUrl}/${id}`);
  }

  createEntry(Entry:any):Observable<any>{
    return this.http.post(this.baseUrl,Entry);
  
  }

  UpdateEntry(id:number,Entry:any):Observable<any>{
    console.log('Update Entry - ',Entry);
    return this.http.put(`${this.baseUrl}/${id}`,Entry);
  }

  deleteEntry(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
