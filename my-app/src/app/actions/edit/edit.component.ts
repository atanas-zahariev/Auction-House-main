import { Component } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { itemI } from '../../shared/interfaces/itemInterfaces';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  hasBider: boolean = false

  editForm = new FormGroup({
    title: new FormControl(''),
    imgUrl: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
  })

  constructor(
    private itemsService: ItemsService,
    private activRoute: ActivatedRoute,
    private route: Router,
    private errorService: ErrorService
  ) {
    const id = this.activRoute.snapshot.params['id']
    this.itemsService.details(id).subscribe(
      (data) => {
        if(data.item.bider){
          this.hasBider = true
        }
        this.editItem(data.item)
      },
      (error) => {      
        this.errorService.getError(error.error)
      }
    )
  }

  editItem(data: itemI) {
    this.editForm.patchValue({
      title: data.title,
      category: data.category,
      imgUrl: data.imgUrl,
      price: data.price.toString(),
      description: data.description
    })
  }

  onSubmit() {
    const { title, category, imgUrl, price, description } = this.editForm.value;

    const arrOfCategories = ['vehicles', ' real', 'estate', 'electronics', 'furniture', 'other']

    const IMAGE_URL = /^https?:\/\/.*/i

    if(Object.values(this.editForm.value).some(x => !x)){
      this.errorService.Error = ['All fields are required!'];
      return;
    }

    if (title?.length) {
      if (title.length < 4) {
        this.errorService.Error = ['Title must be at least 4 characters.']
        return;
      }
    }

    if (category) {
      if (!arrOfCategories.includes(category)) {
        this.errorService.Error = ['It is not in the list of categories.']
        return;
      }
    }

    if (imgUrl) {
      if (!IMAGE_URL.test(imgUrl)) {
        this.errorService.Error = ['Invalid Url.']
        return
      }
    } 

    if (price) {
      if (Number(price) <= 0) {
        this.errorService.Error = ['This price cannot be real.']
        return;
      }
    }

    if (description) {
      if (description.length > 200) {
        this.errorService.Error = ['Description must be at most 200 characters.']
        return;
      }
    }
    
    const id = this.activRoute.snapshot.params['id']
    this.itemsService.edit(this.editForm.value,id).subscribe(
      (data) => {
        this.errorService.cleanErrors()
        this.route.navigate([`/action/details/${id}`])
      },
      (error) => {
      
        this.errorService.getError(error.error)
      }
    )
  }
}
