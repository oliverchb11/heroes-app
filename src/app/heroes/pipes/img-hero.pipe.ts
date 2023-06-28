import { Pipe, PipeTransform } from '@angular/core';
import { HeroesI } from '../interfaces/heroes';

@Pipe({
  name: 'imgHero'
})
export class ImgHeroPipe implements PipeTransform {

  transform(hero: HeroesI | undefined, ...args: unknown[]): string {
    
    if(!hero?.id && !hero?.alt_img){
      return 'assets/no-image.png'
    }
    if(hero.alt_img) return hero.alt_img
    return `assets/heroes/${hero.id}.jpg`
  }

}
