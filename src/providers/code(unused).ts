import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class CodeProvider {
    private voteUrl = 'https://moncodecheck.herokuapp.com/vote?id=';
    constructor(public http: HttpClient){}
    vote(name:string,code:string){
        return this.http
        .get(this.voteUrl+name+","+code)
        .pipe(
            map((res: any) => {
                console.log("Before Mapping", res);
                return res.status;
            }),
            filter((res: any) => {
                return true;
            })
        );
    }
}