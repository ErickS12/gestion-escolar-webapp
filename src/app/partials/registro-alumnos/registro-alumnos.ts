import { Component, Input, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared.imports';
import { NgxMaskDirective } from "ngx-mask";
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-alumnos',
  imports: [
    ...SHARED_IMPORTS,  //se agrega el spread operator para importar todo lo que hay en shared.imports.ts
    NgxMaskDirective
  ],
  templateUrl: './registro-alumnos.html',
  styleUrl: './registro-alumnos.scss',
})
export class RegistroAlumnos implements OnInit { //con ctrol . se actualizan las importaciones
  //el onInit carga cualquier funcion o elemento al inicializar la pantalla

  @Input() rol:string = "";
  @Input() datos_user:any = {};

  public alumno: any = {};
  public errors: any = {};
  public editar:boolean = false;
  public idUser: number = 0;

  //contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = "password";    
  public inputType_2: string = "password";

    //Para el select
  public carreras: any[] = [
    {value: '1', viewValue: 'Ingeniería en Computación'},
    {value: '2', viewValue: 'Ingeniería en Software'},
    {value: '3', viewValue: 'Ingeniería en Sistemas Computacionales'},
    {value: '4', viewValue: 'Ingeniería en Electrónica'},
    {value: '5', viewValue: 'Ingeniería en Mecatrónica'},
  ];

  public materias:any[] = [
    {value: '1', nombre: 'Aplicaciones Web'},
    {value: '2', nombre: 'Programación 1'},
    {value: '3', nombre: 'Bases de datos'},
    {value: '4', nombre: 'Tecnologías Web'},
    {value: '5', nombre: 'Minería de datos'},
    {value: '6', nombre: 'Desarrollo móvil'},
    {value: '7', nombre: 'Estructuras de datos'},
    {value: '8', nombre: 'Administración de redes'},
    {value: '9', nombre: 'Ingeniería de Software'},
    {value: '10', nombre: 'Administración de S.O.'},
  ];

  constructor(
    private location: Location, 
    private router: Router
  ) { }

  ngOnInit() { 

  }

  //Funciones para password
  public showPassword()
  {
    if(this.inputType_1 === 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public showPwdConfirmar()
  {
    if(this.inputType_2 === 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public regresar(){
    this.location.back(); //regresa a la pantalla inmediata anterior. 
  }

  public registrar(){

  }

  public actualizar(){

  }

    //Función para detectar el cambio de fecha
  public changeFecha(event :any){
    this.alumno.fecha_nacimiento = event.value.toISOString().split("T")[0];
  }


    // Funciones para los checkbox
  public checkboxChange(event:any){
    if(event.checked){
      this.alumno.materias_json.push(event.source.value)
    }else{
      this.alumno.materias_json.forEach((materia: any, i: any) => {
        if(materia === event.source.value){
          this.alumno.materias_json.splice(i,1)
        }
      });
    }
  }

  public revisarSeleccion(nombre: string){
    if(this.alumno.materias_json){
      const busqueda = this.alumno.materias_json.find((element: string)=>element===nombre);
      if(busqueda !== undefined){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
}
