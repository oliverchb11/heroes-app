import { Component, OnInit, inject } from '@angular/core';
import { HeroServicesService } from '../../services/hero-services.service';
import { HeroesI } from '../../interfaces/heroes';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{

  public heroes: HeroesI[] = []
  private heroesService = inject(HeroServicesService);
  ngOnInit(): void {
    this.heroesService.getHeroesAll().subscribe((heroes) => this.heroes = heroes.reverse())
  }

}
