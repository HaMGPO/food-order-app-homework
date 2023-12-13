import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods } from 'src/data';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/model/constants/url';
import { foodDto } from '../shared/model/FoodDto';

interface Tag {
  id: number;
  name: string;
  description: string;
  // Add more properties as needed
}

@Injectable({
  providedIn: 'root'
})

export class FoodService {


  constructor(private httpClient: HttpClient) { }

  getAll():Observable<foodDto[]>{
    return this.httpClient.get<foodDto[]>(FOODS_URL)
  }

  // search food
  getAllFoodBySearchTerm(searchTerm:string){
    return this.httpClient.get<foodDto[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  
  // get All tag
  getAllTags():Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(FOODS_TAGS_URL)
  }
  

  //  get food by tags
   getAllFoodByTag(tag:string):Observable<foodDto[]>{
    return tag === "All"? this.getAll():this.httpClient.get<foodDto[]>(FOODS_BY_TAG_URL+ tag)
  }

  // get food by Id
  getFoodById(foodId:string):Observable<foodDto>{
    return this.httpClient.get<foodDto>(FOODS_BY_ID_URL +foodId)
  }

 
}
