import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DRIVERS } from '../db-data';
import { NgFor } from '@angular/common';
import { NgForOf } from '@angular/common';
import { Vozac } from './vozac/vozac';

@Component({
  selector: 'app-root',
  imports: [NgForOf, Vozac, NgFor],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('motog');

  soferi=DRIVERS;

  

}