import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroServicesService } from '../../services/hero-services.service';
import { HeroesI, Publisher } from '../../interfaces/heroes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'app-add-hero-page',
  templateUrl: './add-hero-page.component.html',
  styleUrls: ['./add-hero-page.component.css']
})
export class AddHeroPageComponent implements OnInit {
  public optionId: string = "";
  public publisherEdit!: { id: string, desc: string } | undefined;
  private heroService = inject(HeroServicesService)
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog)
  private router = inject(Router);
  private _fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar)
  public form!: FormGroup;
  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comis' },
    { id: 'Marvel Comics', desc: 'Marvel - Comis' },
  ]
  public objectEdit = {
    title: '',
    buttonName: '',
    icon: '',
    isEdit: false,
    isSave: false
  }
  ngOnInit(): void {
    this.formBuilder()
    this.getParamHero();
  }

  private getParamHero(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.optionId = id
      this.actionById(id);
    })
  }

  private formBuilder(): void {
    this.form = this._fb.group({
      id: [''],
      superhero: [''],
      alter_ego: [''],
      first_appearance: [''],
      characters: [''],
      publisher: [Publisher.DCComics],
      alt_img: ['']
    })
  }

  get currentHero(): HeroesI {
    return this.form.value as HeroesI;
  }

  /**
   * 
   * @param data 
   */
  public submitData(data: HeroesI): void {
    //crear hero por que el id no llega en la url
    if (this.optionId === undefined) {
      this.heroService.addHero(data).subscribe((response) => {
        this.form.reset();
        this.router.navigateByUrl('/heroes/list');
        this._snackBar.open('Heroe creado correctamente', 'create', {
          duration: 5000
        });
      })
    } else {
        //actualizar hero por que el id llega en la url
      const { ...object } = this.currentHero;
      object.id = this.optionId;
      this.heroService.updateHero(object).subscribe((respose) => {
        this.router.navigateByUrl('/heroes/list');
        this._snackBar.open('Heroe Actualizado correctamente', 'update', {
          duration: 5000
        });
      })
    }
  }

  /**
   * 
   * @param id 
   */
  public actionById(id: string): void {
    if (id !== undefined) {
      this.objectEdit = {
        title: 'Editar',
        buttonName: 'Editar',
        icon: 'edit',
        isEdit: true,
        isSave: false
      }
      this.heroById(id);
    } else {
      this.form.get('superhero')?.setValidators(Validators.required);
      this.form.get('alter_ego')?.setValidators(Validators.required);
      this.form.get('first_appearance')?.setValidators(Validators.required);
      this.form.get('characters')?.setValidators(Validators.required);
      this.form.get('publisher')?.setValidators(Validators.required);
      this.objectEdit = {
        title: 'Crear',
        buttonName: 'Guardar',
        icon: 'save',
        isEdit: false,
        isSave: true
      }
    }
  }

  /**
   * 
   * @param id 
   */
  public heroById(id: string): void {
    this.heroService.getHeroesById(id).subscribe(hero => {
      if(!hero) return this.router.navigateByUrl('/')
      this.form.reset(hero)
      return
    })
  }

  public deleteHero(): void{
    if(this.optionId !== undefined){
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {superhero: this.currentHero.superhero}
    });
    dialogRef.afterClosed().subscribe((option: boolean) => {
      if(option){
     this.heroService.deleteHeroById(this.optionId).subscribe(isDelete => {
        if(isDelete){
          this.router.navigateByUrl('/heroes/list');
          this._snackBar.open('Heroe Eliminado correctamente', 'delete', {
            duration: 5000
          });
        }
      })
      }
    })
 
    }else{
      this.form.reset()
    }
  }
}
