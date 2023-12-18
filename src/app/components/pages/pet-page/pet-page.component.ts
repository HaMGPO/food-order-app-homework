import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PetsService } from 'src/app/services/pets.service';
import { MascotaDto } from 'src/app/shared/model/MascotaDto';
import { VisitaDto } from 'src/app/shared/model/VisitDto';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.css']
})
export class PetPageComponent {
  mascota!: MascotaDto;
  historialMascota: VisitaDto[] = [];
  registroVisita: VisitaDto = {}
  id: number = -1;

  mascotaInfoData = new FormGroup({
    nombre: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl(new Date(), Validators.required),
    sexo: new FormControl(0, Validators.required),
  });

  visitaRegistroData = new FormGroup({
    fecha: new FormControl(null, Validators.required),
    fechaRetorno: new FormControl(null, Validators.required),
    tratamiento: new FormControl(null, Validators.required),
    veterinaria: new FormControl(null, Validators.required),
    descripcion: new FormControl(null, Validators.required),
    producto: new FormControl(null, Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiMascota: PetsService
  ) { }

  ngOnInit() {
    //procederemos a extraer el parametro id de la ruta del navegador
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.getMascota();
    
  }

  getMascota(): void { 
    this.apiMascota.obtenerMascotaID(this.id)
      .pipe().subscribe({
        next: (tg: MascotaDto) => {

          this.mascota = tg;
          this.registroVisita.mascotaId = tg.id;
          console.log(this.mascota);
          this.mascotaInfoData.controls['sexo'].setValue(tg.sexo!);
          this.apiMascota.obtenerVisitasMascota(tg.id!)
            .subscribe(
              (historial: VisitaDto[]) => this.historialMascota = historial
            );
        },

        error: () => {
          console.log('Error de ')
        }
      });
  }

  save(): void {
    if (this.mascota) {
      this.mascota.sexo = this.mascotaInfoData.get('sexo')?.value!;
      this.mascota.fechaNacimiento! = this.mascotaInfoData.get('fechaNacimiento')!.value!;
      console.log(this.mascota);
      this.apiMascota.addSaveMascota(this.mascota)
        .subscribe(() => console.log());
        // window.location.reload()
    }
  }

  saveRegistro(): void {
    if (this.registroVisita) {
      console.log(this.registroVisita);
      this.registroVisita.id = -1;
      this.apiMascota.addVisitaMascota(this.registroVisita)
        .subscribe(() => window.location.reload());
    }
  }

  goBack(): void {
    if (this.mascota) {
      this.apiMascota.addSaveMascota(this.mascota)
        .subscribe(() => this.router.navigate(['/home']));
    }
  }


}
