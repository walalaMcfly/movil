import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL ="http://localhost:3000/";
  private http: HttpClient = inject(HttpClient);
  
  constructor() { }
  
  login(username: string): Observable<any>{
    return this.http
      .get(this.baseURL+'/users?username=' + username)
      .pipe(retry(3));
  }
  
  register(data:any):Observable<any>{
    return this.http
      .post(this.baseURL+'/users',data)
      .pipe(retry(3));
  }

  eliminarUsuario(username:string):Observable<any>{
    return this.http
    .delete(this.baseURL+'/users?username=' + username)
    .pipe(retry(3));
  }

  listaUsuarios(data:any):Observable<any>{
    return this.http.get(this.baseURL+'/users', data)
    .pipe(retry(3));
  }
}


