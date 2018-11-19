import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from "./authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router:Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authenticationService.logout();
                location.reload(true);
                console.log("error 401")
            } else if(err.status === 403) {
                console.log("error 403")
                this.router.navigate(['/']);
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}