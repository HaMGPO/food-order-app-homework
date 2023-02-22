import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods } from 'src/data';
import { FOODS_BY_SEARCH_URL, FOODS_URL } from '../shared/model/constants/url';
import { food } from '../shared/model/Food';

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  constructor(private httpClient: HttpClient) { }

  getAll():Observable<food[]>{
    return this.httpClient.get<food[]>(FOODS_URL)
  }

  // search food
  getAllFoodBySearchTerm(searchTerm:string){
    return this.httpClient.get<food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  // get All tag
  getAllTags():Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(FOODS_BY_SEARCH_URL)
  }

   // get food by tags
   getAllFoodByTag(tag:string):food[]{
    return 
  }

  // get food by Id
  getFoodById(foodId:string){
    return this.httpClient.get<food>(FOODS_BY_SEARCH_URL +foodId)
  }

 
}
