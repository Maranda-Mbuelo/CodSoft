import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ICart } from 'src/interfaces/ICart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private itemsSubject = new BehaviorSubject<ICart[]>([]);
  items$ = this.itemsSubject.asObservable();
  apiBaseUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllCart(): Observable<ICart[]> {
    return this.http.get<ICart[]>(this.apiBaseUrl + '/api/carts').pipe(
      tap((data) => this.itemsSubject.next(data)),
    );
  }
  
  getCartById(id: string): Observable<ICart>{
    return this.http.get<ICart>(this.apiBaseUrl + '/api/carts/' + id);
  }

  createCart(cart: ICart): Observable<ICart>{
    return this.http.post<ICart>(this.apiBaseUrl + '/api/carts/', cart).pipe(
      tap((addedCart) => {
        const currentData = this.itemsSubject.value;
        const updatedData = [...currentData, addedCart];
        this.itemsSubject.next(updatedData);
      })
    )
  }

  editCart(id: string, updatedCart: ICart): Observable<ICart>{
    return this.http.put<ICart>(this.apiBaseUrl + '/api/carts/' + id, updatedCart);
  }

  deleteCart(id: string): Observable<ICart>{
    return this.http.delete<ICart>(this.apiBaseUrl + '/api/carts/' + id);
  }

}
