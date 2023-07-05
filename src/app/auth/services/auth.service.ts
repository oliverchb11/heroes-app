import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorResponse, User } from '../interfaces/auth-interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;
  private user?: User;
  private http = inject(HttpClient);

 
  get currentUser(): User | undefined{
    if(!this.user) return undefined;
    return structuredClone(this.user);
  }

  public login(email: string, password: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap( user => this.user = user),
      tap( user =>  localStorage.setItem('token', 'byEWEDFEFDFFOKJHGFBFG.GFHGHFHYJYYHRFR.GFGFGF'))
    )
  }

  public checkAuthenticationStatus(): Observable<boolean>{
    if(!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return this.http.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap( user => this.user = user),
      map( user => !!user ),
      catchError( err => of(false) )
    )
  }


  public logout(): void{
    this.user = undefined;
    localStorage.removeItem('token');
  }
}
