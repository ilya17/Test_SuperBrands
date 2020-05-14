import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { Employee } from '../shared/model/employee';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShopsService } from '../services/shops.service';
import { Shop } from '../shared/model/shop';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  public selectedEmployees = [];
  public chosenEmployee;
  public shop: Shop;
  public numbersOfShops = 0;

  private destroyed$: Subject<void> = new Subject()

  constructor(
    private shopsService: ShopsService,

    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getShop();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete()
  }

  /**
   * Добавляет выбранного сотрудника во вкладку
   */
  addEmployee(): void {
    const dialogref = this.dialog.open(EmployeeDialogComponent);
    dialogref.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: Employee) => {
      if(result && !this.selectedEmployees.find(item => item.id === result.id )) {
        result.shops = [];
        this.selectedEmployees.push(result);
        this.chosenEmployee = result;
      }
    })
  }

  /**
   * Добавляет выбранного сотрудника из вкладки в главное окно
   */
  choiceEmployee(id: number): void {
    this.chosenEmployee = this.selectedEmployees.find(item => item.id === id);
  }

  /**
   * Получаем магазин
   */
  getShop(): void{
    this.shopsService.shop
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res => {
      this.shop = res;
      this.addShopToEmployee();
    })
  }

  /**
   * Добавляем магазин к сотруднику
   */
  addShopToEmployee(): void{
    this.selectedEmployees.forEach(employee => {
      Object.keys(this.chosenEmployee).forEach(key => {
        if (this.chosenEmployee[key] === employee.id) {
          employee.shops.push(this.shop);
        }
      })
    })
  }

  /**
   * Удалить сотрудника
   */
  removeEmployee(id: number):void {
    this.selectedEmployees = this.selectedEmployees.filter(employee => id !== employee.id);
    if (this.selectedEmployees.length) {
      this.choiceEmployee(this.selectedEmployees[0].id)
    }
  }
}
