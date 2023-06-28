import { Component, Input, OnInit } from '@angular/core';
import { HeroesI } from '../../interfaces/heroes';

@Component({
  selector: 'hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit{
  
  @Input({required: true}) public heroe!: HeroesI | undefined;
  ngOnInit(): void {
    if(!this.heroe) throw Error('fail data')
  }
}
