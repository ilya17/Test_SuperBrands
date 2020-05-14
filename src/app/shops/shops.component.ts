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

  public shops = [];

  private destroyed$: Subject<void> = new Subject();

  constructor(
    private shopsService: ShopsService
  ) { }

  ngOnInit() {
    this.getShops()
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

}
