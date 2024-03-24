import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class customInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('loginTOken');
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next.handle(modifiedReq);
  }
}
