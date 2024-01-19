import { Component } from '@angular/core';
import {  itemI } from '../../shared/interfaces/itemInterfaces';
import { ItemsService } from 'src/app/services/items.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  items:itemI[] = []
  hasLenght:boolean = false
  constructor(
    private itemService : ItemsService,
    private errorService: ErrorService
    ) { 

    this.errorService.cleanErrors();

    this.itemService.catalog().subscribe(
      (data) => {
        this.items = data.items;
        if(this.items.length > 0 ){
          this.hasLenght = true;
        }
      },
      (error) => {
        this.errorService.getError(error.error) ;
      }
    )
  };

}
