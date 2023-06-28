import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { HeroesI } from '../interfaces/heroes';

import { Observable, catchError, delay, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroServicesService {

  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl

  public getHeroesAll(): Observable<HeroesI[]>{
    return this.http.get<HeroesI[]>(`${this.baseUrl}/heroes`);
  }
  public getHeroesById(id: string): Observable<HeroesI | undefined>{
    return this.http.get<HeroesI>(`${this.baseUrl}/heroes/${id}`).pipe
    (
      catchError( error => of(undefined))
    )
  }
  public searchHeroes(q: string, limit = 6): Observable<HeroesI[] | undefined>{
    const params = new HttpParams()
    .set('q', q)
    .set('_limit', limit)
    return this.http.get<HeroesI[]>(`${this.baseUrl}/heroes`, {params: params}).pipe 
    (
      catchError( error => of(undefined))
    )
  }

  public addHero(hero: HeroesI): Observable<HeroesI>{
    return this.http.post<HeroesI>(`${this.baseUrl}/heroes`, hero)
  }
  public updateHero(hero: HeroesI): Observable<HeroesI>{
    if(!hero.id) throw Error('Hero id is required')
    return this.http.patch<HeroesI>(`${this.baseUrl}/heroes/${hero.id}`, hero)
  }
  public deleteHeroById(id: string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError(err => of(false)),
      map(data => true)
    )
  }
}
