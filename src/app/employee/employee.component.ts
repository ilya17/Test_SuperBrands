import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { Employee } from '../shared/model/employee';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  public selectedEmployees = [];

  private destroyed$: Subject<void> = new Subject()

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete()
  }

  /**
   * Добавляет выбранного сотрудника
   */
  addEmployee() {
    const dialogref = this.dialog.open(EmployeeDialogComponent);
    dialogref.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: Employee) => {
      if(!this.selectedEmployees.find(item => item.id === result.id )) {
        this.selectedEmployees.push(result);
      }
    })
  }

}
