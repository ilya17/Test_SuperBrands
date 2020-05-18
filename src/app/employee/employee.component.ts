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
  public chosenEmployee: Employee;
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
    const dialogref = this.dialog.open(EmployeeDialogComponent, {data: this.selectedEmployees});
    dialogref.afterClosed()
    .pipe(takeUntil(this.destroyed$))
    .subscribe((result: Employee) => {
      if(result && !this.selectedEmployees.find(item => item.id === result.id )) {
        result.shops = [];
        this.selectedEmployees.push(result);
        this.chosenEmployee = result;
      }
    })

    this.shopsService.isSelectedEmployees.next(true)
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
  getShop(): void {
    this.shopsService.shop
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res => {
      this.addShopToEmployee(res);
    })
  }

  /**
   * Добавляем магазин к сотруднику
   */
  addShopToEmployee(gotShop: Shop): void{
    this.selectedEmployees.forEach(employee => {
      Object.keys(this.chosenEmployee).forEach(key => {
        if (this.chosenEmployee[key] === employee.id) {
          employee.shops.push(gotShop);
        }
      })
    })
  }

  /**
   * Удалить сотрудника
   */
  removeEmployee(id: number):void {
    this.shopsService.removeShopEmployee.next(this.chosenEmployee.shops)
    this.selectedEmployees = this.selectedEmployees.filter(employee => id !== employee.id);
    if (this.selectedEmployees.length) {
      this.choiceEmployee(this.selectedEmployees[0].id)
    } else {
      this.shopsService.isSelectedEmployees.next(false)
    }
  }

  /**
   * Удалить сотрудника
   */
  removeShop(shop): void {
    this.shopsService.removeShopEmployee.next([shop]);
    this.chosenEmployee.shops = this.chosenEmployee.shops.filter(item => item.id !== shop.id)
  }

  /**
   * Склоняем существительное в зависимости от числительного
   */
  getWord(number: number, word:string[]): string {
    const cases = [2, 0, 1, 1, 1, 2];
    return word[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];
  }
}
