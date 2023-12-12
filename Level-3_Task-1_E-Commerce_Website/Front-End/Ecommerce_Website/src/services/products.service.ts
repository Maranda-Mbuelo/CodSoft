import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environment/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IProduct } from 'src/interfaces/IProduct';
import { IEditProduct } from 'src/interfaces/IEditProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private dataSubject = new BehaviorSubject<any[]>([]);
  public data$ = this.dataSubject.asObservable();
  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // getAllProducts(): Observable<IProduct[]> {
  //   return this.http
  //   .get<IProduct[]>(
  //     `${this.apiBaseUrl}/api/Product`
  //   );
  // }

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiBaseUrl}/api/Product`).pipe(
      tap((data) => this.dataSubject.next(data)),
    );
  }
  
  getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiBaseUrl}/api/Product/${id}`);
  }
  

  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiBaseUrl}/api/Product/`, product).pipe(
      tap((addedProduct) => {
        // Update dataSubject with the added product
        const currentData = this.dataSubject.value;
        const updatedData = [...currentData, addedProduct];
        this.dataSubject.next(updatedData);
      })
    );
  }

  editProduct(id: string, updatedProduct: IEditProduct): Observable<IEditProduct> {
    return this.http.put<IEditProduct>(`${this.apiBaseUrl}/api/Product/${id}`, updatedProduct).pipe(
      tap(() => {
        // Update dataSubject with the edited product
        const currentData = this.dataSubject.value;
        const updatedData = currentData.map(product => (product.productID === id ? { ...product, ...updatedProduct } : product));
        this.dataSubject.next(updatedData);
      })
    );
  }

  deleteProductById(id: string): Observable<IProduct> {
    return this.http
      .delete<IProduct>(`${this.apiBaseUrl}/api/Product/${id}`)
      .pipe(
        tap(() => {
          // Remove the deleted product from the dataSubject
          const currentData = this.dataSubject.value;
          const updatedData = currentData.filter(product => product.productID !== id);
          this.dataSubject.next(updatedData);
        })
      );
  }
  

}
