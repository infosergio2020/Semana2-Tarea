import { Component, OnInit } from '@angular/core';
import { ObraDetalle } from './../models/obra-detalle.model';
import { ObrasApiClient } from './../models/obras-api-client.Model';

@Component({
  selector: 'app-lista-obras',
  templateUrl: './lista-obras.component.html',
  styleUrls: ['./lista-obras.component.css']
})
export class ListaObrasComponent implements OnInit {
  preferidos: ObraDetalle[];
  
  constructor(public obrasApiClient:ObrasApiClient) { 
    this.preferidos = [];
  }

  ngOnInit(): void {
  }

  agregado(o: ObraDetalle) {
    this.obrasApiClient.add(o);
    return false;//no queremos que recargue
  }

  elegido(o:ObraDetalle){

    this.obrasApiClient.getAll().forEach(x => x.setSelected(false));
    o.setSelected(true);

    //La logica que sigue es para agregar elementos a una lista de preferidos
    if (this.preferidos.length === 0) {
      this.preferidos.push(o);  
    } else {
      let find = false 
      let count = this.preferidos.length-1;
      while( count >= 0){
        if (this.preferidos[count] === o ){
          find = true;
          break;
        }
        count--;
      }
      if (!find){
        this.preferidos.push(o);
      }
    }
    console.log(this.preferidos)
  }
}
