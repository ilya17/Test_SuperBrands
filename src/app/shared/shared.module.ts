import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ShopsService } from '../services/shops.service';
import { EmployessService } from '../services/employess.service';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  entryComponents: [
    EmployeeDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    ShopsService,
    EmployessService
  ],
})
export class SharedModule { }
