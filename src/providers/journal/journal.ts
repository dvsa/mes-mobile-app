import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JournalProvider {

  url = 'https://vulv731rce.execute-api.eu-west-1.amazonaws.com/default';

  constructor(public http: HttpClient) {}

  getJournal(){
    return this.http.get(this.url);
  }
}
