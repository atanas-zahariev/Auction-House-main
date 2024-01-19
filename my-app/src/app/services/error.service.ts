import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  Error: string[] = []

  cleanErrors() {
    this.Error = []
  }

  getError(data:any){
    if(Array.isArray(data)){
      this.Error = data
    }else if(typeof data == 'string'){
      this.Error = data.split('\n')
    }else if(typeof data == 'object'){
      this.Error = ['There seems to be a problem please try again later']
    }
  }

  constructor() { }
}
