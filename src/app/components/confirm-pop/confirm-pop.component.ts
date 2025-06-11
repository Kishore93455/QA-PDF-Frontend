import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-pop',
  standalone:true,
  imports: [MatDialogModule],
  templateUrl: './confirm-pop.component.html',
  styleUrl: './confirm-pop.component.scss'
})
export class ConfirmPopComponent {

  constructor ( private dialogref: MatDialogRef<ConfirmPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  closeDialog() {
      this.dialogref.close(false);
  }

  returnEvent(){
      this.dialogref.close(true);
  }

}
