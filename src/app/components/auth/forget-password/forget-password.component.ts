import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatIconModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

    constructor ( private dialogref: MatDialogRef<ForgetPasswordComponent>) {}

    send(email: string){
        if (email.trim() === ""){
          alert("Mail is Required")
          return
        }
        console.log("Mail send to the", email)
        alert(`Mail send to the ${email}`)
    }

    closeDialog() {
        this.dialogref.close(false)
    }

}
