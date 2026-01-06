import { Component, Input } from '@angular/core';
import { shofer } from '../shofer';

@Component({
  selector: 'app-vozac',
  imports: [],
  templateUrl: './vozac.html',
  styleUrl: './vozac.css',
})
export class Vozac {
  @Input()
  ime:String="";

  @Input()
  motordzija:shofer | undefined;
 
  funk(){
    console.log("Me stisna");
  }

  @Input()
  index:number=0;

}