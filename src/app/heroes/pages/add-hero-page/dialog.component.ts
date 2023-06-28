import { Component, Inject } from "@angular/core";
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'dialog-animations-example-dialog',
    templateUrl: 'dialog.component.html',
    standalone: true,
    imports: [MatButtonModule,MatDialogModule]
  })
  export class DialogComponent {
    constructor
    (
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
 
    }

    option(opt: boolean): void{
        this.dialogRef.close(opt)
    }

  }