import { Component } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-close-offer',
  templateUrl: './close-offer.component.html',
  styleUrls: ['./close-offer.component.css']
})
export class CloseOfferComponent {
  constructor(
    private itemsService: ItemsService,
     private activRoute:ActivatedRoute,
     private route:Router,
     private errorService : ErrorService
     ){
    const id = this.activRoute.snapshot.params['id']
    this.itemsService.closeOffer(id).subscribe(
      (data) => {
        this.route.navigate(['/item/closed'])
      },
      (error) => {
        this.errorService.getError(error.error)
      }
    )
  }
}
