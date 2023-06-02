import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  register(user: FormData): Observable<{ message: string, token: string }> {
    return this.http.post<{ message: string, token: string }>('http://localhost:3000/api/v1/register', user);
  }
  login(data: string, password: string): Observable<{ message: string, token: string }> {
    return this.http.post<{ message: string, token: string }>('http://localhost:3000/api/v1/login', { data, password });
  }
  getUser(id: string) {
    return this.http.get<{ message: string, user: User }>(`http://localhost:3000/api/v1/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  }


}
