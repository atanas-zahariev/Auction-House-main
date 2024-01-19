import { Component } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(
    private itemsService: ItemsService,
    private route: Router,
    private fb: FormBuilder,
    private errorService: ErrorService
  ) { }

  createForm = this.fb.group({
    title: [''],
    category: [''],
    imgUrl: [''],
    price: [''],
    description: ['']
  })

  onSubmit() {
    const { title, category, imgUrl, price, description } = this.createForm.value;

    const arrOfCategories = ['vehicles', ' real', 'estate', 'electronics', 'furniture', 'other']

    const IMAGE_URL = /^https?:\/\/.*/i

    if (Object.values(this.createForm.value).some(x => !x)) {
      this.errorService.Error = ['All fields are required']
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


    this.itemsService.create(this.createForm.value).subscribe(
      (data) => {
        this.errorService.cleanErrors()
        this.route.navigate(['/item/catalog'])
      },
      (error) => {
        this.errorService.getError(error.error)
      }
    )
  }
}
