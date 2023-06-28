import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { HeroServicesService } from '../../services/hero-services.service';
import { HeroesI } from '../../interfaces/heroes';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit{

  private activatedRouter = inject(ActivatedRoute);
  private router = inject(Router);
  private heroesService = inject(HeroServicesService);
  public hero!: HeroesI | undefined;
  ngOnInit(): void {
    this.paramUrlHero()
  }

  private paramUrlHero(): void{
    this.activatedRouter.params.pipe(
      switchMap(({id}) => this.heroesService.getHeroesById(id))
    ).subscribe((hero) => {
      if(!hero) return this.router.navigateByUrl('/heroes/list')
      this.hero = hero
      return;
    })
  }

  public goBack(): void{
    this.router.navigateByUrl('/heroes/list')
  }

}
