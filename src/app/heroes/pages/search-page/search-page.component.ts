import { Component, OnInit, inject } from '@angular/core';
import { HeroServicesService } from '../../services/hero-services.service';
import { FormControl } from '@angular/forms';
import { HeroesI } from '../../interfaces/heroes';
import { Observable, map, startWith } from "rxjs";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit{

  public searchHero = new FormControl();
  public heroes: HeroesI[] | undefined = []
  private heroesService = inject(HeroServicesService);
  public selectedHero?: HeroesI
  filteredOptions!: Observable<HeroesI[]>;
  ngOnInit(): void {
 
  }

  public searcHero(): void{
    const value = this.searchHero.value || "";
    this.heroesService.searchHeroes(value).subscribe((hero) => {
      console.log(hero);
      this.heroes = hero
    })
  }

  public onSelectedOption(event: MatAutocompleteSelectedEvent): void{
    if(event.option.value === "") {
      this.selectedHero = undefined
      return
    };
    this.searchHero.setValue(event.option.value.superhero);
    this.selectedHero = event.option.value;
  }



}
