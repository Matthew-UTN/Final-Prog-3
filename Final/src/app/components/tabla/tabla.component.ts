import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonaInterface } from 'src/app/models/persona';
import { DataapiService } from '../../services/dataapi.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {
  personas: PersonaInterface[] = [];
  personaBas: FormGroup;
  post: any;
  titleAlert: string = 'Se requiere este campo';
  persona: PersonaInterface = {
    id: 0,
    nombre: '',
    apellido: '',
    dni: 0
  };

  constructor(private service: DataapiService, private router: Router, private rutaActiva: ActivatedRoute) {
    this.personaBas = new FormGroup({
      id: new FormControl(0),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((data) => {
      this.personas.length = 0;
      data.forEach((res) => {
        this.personas.push(res);
      });
      console.log(this.personas);
    });
  }

  delete(id: number) {
    const opcion = confirm('¿Esta seguro que desea eliminar?');
    if (opcion) {
      this.service.delete(id).subscribe((data) => {
        console.log(data);
        this.getAll();
        alert('Registro eliminado');
      });
    } else {

    }
  }

  update(id: number) {
    this.service.getOne(id).subscribe(
      res => {
        this.setFormulario(res);
      },
      err => {
        console.log(err);
      }
    );

  }

  setFormulario(persona: PersonaInterface) {
    this.personaBas.get('id').setValue(persona.id);
    this.personaBas.get('nombre').setValue(persona.nombre);
    this.personaBas.get('apellido').setValue(persona.apellido);
    this.personaBas.get('dni').setValue(persona.dni);
  }

  addPost(id: number) {
    id = parseInt(this.personaBas.get('id').value);
    this.guardarPersona();
    if (id !== 0) {
      this.service.put(id, this.persona).subscribe(
        (data) => {
          this.persona = data;
          this.getAll();
          this.refresh();
        });     
    } else {
      this.service.post(this.persona).subscribe(
        (data) => {
          this.persona = data;
          this.getAll();
          this.refresh();
        });      
    }
  }
  guardarPersona() {
    this.persona.id = parseInt(this.personaBas.get('id').value);
    this.persona.nombre = this.personaBas.get('nombre').value;
    this.persona.apellido = this.personaBas.get('apellido').value;
    this.persona.dni = this.personaBas.get('dni').value;
    console.log(this.personaBas.get('id').value);
    console.log(this.personaBas.get('nombre').value)
  }

  refresh() {
    this.personaBas.reset();
    this.personaBas.get('id').setValue(0);
    console.log(this.personaBas.get('id').value);
  }
}
