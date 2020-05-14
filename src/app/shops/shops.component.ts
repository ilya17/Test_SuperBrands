import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShopsService } from '../services/shops.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Shop } from '../shared/model/shop';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss'],
})
export class ShopsComponent implements OnInit, OnDestroy {

  public shops: Shop[] = [];
  public removedShop: Shop;
  public isShow: boolean;

  private destroyed$: Subject<void> = new Subject();

  constructor(
    private shopsService: ShopsService
  ) { }

  ngOnInit() {
    this.isEmployees();
    this.getShops();
    this.getRemovedShop()
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete()
  }

  /**
   * Получить список магазинов
   */
  getShops() {
    this.shopsService.getShops()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res => {
      this.shops = res;
    })
  }

  /**
   * Удаляем выранный магазин из списка
   */
  moveShop(id: number): void {
    this.sendShop(id);
    this.shops = this.shops.filter(shop => id !== shop.id)
  }

  /**
   * Удаляем выранный магазин из списка
   */
  sendShop(id: number): void {
    const shop = this.shops.find(shop => id === shop.id);
    this.shopsService.shop.next(shop)
  }

  /**
   * Получаем удаленный магазин пользователя
   */
  getRemovedShop(): void {
    this.shopsService.removeShopEmployee
    .pipe(takeUntil(this.destroyed$))
    .subscribe((res: Shop[]) => {
      this.addRemovedShop(res)
    })
  }

  /**
   * Добавляем удаленный магазин пользователя
   */
  addRemovedShop(removedShop: Shop[]): void {
    this.shops.push(...removedShop);
  }

  /**
   * Проверяем есть ли сотрудники в списке
   */
  isEmployees(): void {
    this.shopsService.isSelectedEmployees
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res => {
      this.isShow = res;
    })
  }
}

