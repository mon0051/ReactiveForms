import { Component, OnInit } from '@angular/core';
import { VillainsService } from "../services/villains.service";
import { Villain } from "../data/villain";

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.scss']
})
export class VillainListComponent implements OnInit {
  villainList : Villain [];

  constructor(private villainService:VillainsService) {
    this.villainList = villainService.getVillains();
  }

  ngOnInit() {
  }

  showUpdate(villain){

    console.log(villain);
  }

}
