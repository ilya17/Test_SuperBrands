import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Shop } from '../shared/model/shop';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {

  public apiHost = '../../assets/shops.json'

  private destroyed$: Subject<void> = new Subject();
  private shops: Observable<Shop[]>

  constructor(private http: HttpClient) { }

  /**
   * Получить все магазины
   */
  getShops(): Observable<Shop[]> {
    return this.http.get(this.apiHost).pipe(map((shops: Shop[])=> shops));
  }

}
