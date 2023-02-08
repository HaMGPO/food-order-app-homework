import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/model/Food';


@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit{
  food!:food;
  constructor(activatedRoute:ActivatedRoute, private api:FoodService){
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.food = api.getFoodById(params.id)
    })
  }
  ngOnInit(): void {

  }
}
