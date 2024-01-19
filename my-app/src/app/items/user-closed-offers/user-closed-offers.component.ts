import { Component } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { itemI } from '../../shared/interfaces/itemInterfaces';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-user-closed-offers',
  templateUrl: './user-closed-offers.component.html',
  styleUrls: ['./user-closed-offers.component.css']
})
export class UserClosedOffersComponent {
  items: itemI[] = []
  hasLenght: boolean = false

  constructor(
    private itemsService: ItemsService,
    private errorService: ErrorService
    ) {
    this.itemsService.userClosedOffers().subscribe(
      (data) => {
        this.items = data.items;
        if (this.items.length > 0) {
          this.hasLenght = true;
        }

      },
      (error) => {
        this.errorService.getError(error.error)
      }
    )
  }
}
