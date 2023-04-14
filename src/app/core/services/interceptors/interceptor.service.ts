import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  private countRequest = 0;

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    !this.countRequest && this.loadingService.show();
    this.countRequest++;

    return next.handle(request).pipe(
      finalize(() => {
        this.countRequest--;
        !this.countRequest && this.loadingService.hide();
      })
    );
  }

}
