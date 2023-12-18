import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { LocalService } from 'src/app/services/local.service';
import { PetsService } from 'src/app/services/pets.service';
import { foodDto } from 'src/app/shared/model/FoodDto';
import { MascotaDto } from 'src/app/shared/model/MascotaDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // foods:foodDto[] = []
  mascotas:MascotaDto[] = [];
  // constructor(private api: FoodService, private route: ActivatedRoute) {
  //   this.route.params.subscribe(params => {
  //     if (params.searchTerm) {
  //       this.api.getAllFoodBySearchTerm(params.searchTerm).subscribe(result => {
  //         this.foods = result;
  //       });
  //     } else {
  //       this.api.getAll().subscribe(result => {
  //         this.foods = result;
  //       });
  //     }
  //   });
  // }

  constructor(
    private route: ActivatedRoute,
    private apiMascota: PetsService,
    public localStore: LocalService
    ) {
    this.route.params.subscribe(params => {
      console.log
      console.log(params)

      if (!(params.searchTerm === "all")) {
        this.apiMascota.obtenerMascotasPropietario(params.searchTerm).subscribe(result => {
          this.mascotas = result;
        });
      }
      console.log('buscar todo');
      this.apiMascota.obtenerTodasMascotas().subscribe(result => {
        this.mascotas = result;
      });

    });
  }

  ngOnInit(): void {
    this.localStore.checkPersistance();
  }

}
