import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { EmployessService } from '../services/employess.service';
import { takeUntil } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../shared/model/employee';
import { RequestModalData } from './request-modal.data';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.scss']
})
export class EmployeeDialogComponent implements OnInit, OnDestroy {


  public form: FormGroup;
  public employees = [];

  private destroyed$: Subject<void> = new Subject()

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,

    private fb: FormBuilder,
    private employessService: EmployessService,
    @Inject(MAT_DIALOG_DATA) public data: Employee[]
  ) {
    this.form = fb.group({
      fullName: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete()
  }

  /**
   * Получить список сотрудников
   */
  getEmployees() {
    this.employessService.getEmployees()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res => {
        this.employees = res;
        if (this.data.length) {
          this.data.forEach(item => {
            this.employees = this.employees.filter(emp => item.id !== emp.id)
          })
        }
      })
  }

  /**
   * Отправляет форму
   */
  onSubmit() {
    if (this.form.valid) {
      const selectedEmployee = this.form.controls.fullName.value
      this.dialogRef.close(selectedEmployee);
    }
  }

}
