import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPopComponent } from '../confirm-pop/confirm-pop.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authService: AuthService,
  private matdialog : MatDialog
  ) {}

  logout(): void {

    const dialogref = this.matdialog.open( ConfirmPopComponent, {
      data: 'Are you sure you want to proceed with this action? This change cannot be undone. Please confirm to continue or cancel to go back.'})

    dialogref.afterClosed().subscribe( result => {
      if (result) {
        this.authService.logout();
      }
      })
    }
}

