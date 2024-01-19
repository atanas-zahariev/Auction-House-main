import { Component } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
   constructor(
    private itemsService: ItemsService,
    private router: Router,
    private activRoute: ActivatedRoute,
    private errorService: ErrorService
    ){
      const id = this.activRoute.snapshot.params['id']

      this.itemsService.delete(id).subscribe(
        () => {
          this.errorService.cleanErrors()
          this.router.navigate(['/item/catalog'])
        },
        (error) => {
          this.errorService.getError(error.error);
        }
      )
    }
}
