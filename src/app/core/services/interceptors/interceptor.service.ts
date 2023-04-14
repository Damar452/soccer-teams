import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  private countRequest = 0;

  constructor(private loadingService: LoadingService, private alertService: AlertService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    !this.countRequest && this.loadingService.show();
    this.countRequest++;

    return next.handle(request).pipe(
      finalize(() => {
        this.countRequest--;
        !this.countRequest && this.loadingService.hide();
      }),
      catchError((excepcion: HttpErrorResponse) => {
        excepcion.status >= 500 &&  this.alertService.errorAlert(excepcion.error);
        return throwError(excepcion.error.text);
      })
    );
  }

}
