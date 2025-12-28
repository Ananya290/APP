import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toDoI } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class TaskMasterService {

  api = "http://localhost:3000/toDoData";
   todo$ = new BehaviorSubject<toDoI[]>([]);



  constructor(private http :HttpClient) { }

  postApi(data :toDoI){
   return this.http.post<toDoI>(this.api,data);

  }
  getAPi(){
    return this.http.get<toDoI[]>(this.api)
  }
  deleteApi(id:any){
    return this.http.delete<toDoI>(`${this.api}/${id}`)
  }
  getTaskById(id:any):Observable<toDoI>{
    return this.http.get<toDoI>(`${this.api}/${id}`)
  }
  
  updateApi(data:toDoI,id:any):Observable<toDoI>{
  
    return this.http.put<toDoI>(`${this.api}/${id}`,data)
  }
}
