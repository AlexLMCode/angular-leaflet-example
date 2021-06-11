import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor() { }

  makeCapitalPopup(data: any): string {
    
    
    return `` +
      `<div>Capital: ${ data.ciudad }</div>` +
      `<div>State: ${ data.state }</div>` +
      `<div>Population: ${ data.population }</div>`
  }

  makeDenuesPopup(data: any): string {
    console.log('HERE!');
    return `` +
      `<div>Capital: ${ data.estado }</div>` +
      `<div>State: ${ data.calle }</div>` +
      `<div>Population: ${ data.ciudad }</div>`
  }
}
