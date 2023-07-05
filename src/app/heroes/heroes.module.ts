import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { AddHeroPageComponent } from './pages/add-hero-page/add-hero-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { ImgHeroPipe } from './pipes/img-hero.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutPageComponent,
    HeroPageComponent,
    ListPageComponent,
    AddHeroPageComponent,
    SearchPageComponent,
    HeroCardComponent,
    ImgHeroPipe
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class HeroesModule { }
