import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Shop } from '../shared/model/shop';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  public shop: BehaviorSubject<Shop> = new BehaviorSubject(null);
  public removeShopEmployee: BehaviorSubject<Shop[]> = new BehaviorSubject([]);
  public isSelectedEmployees: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public apiHost = '../../assets/shops.json'

  constructor(private http: HttpClient) { }

  /**
   * Получить все магазины
   */
  getShops(): Observable<Shop[]> {
    return this.http.get(this.apiHost).pipe(map((shops: Shop[])=> shops));
  }

}
