import { Injectable } from '@angular/core';
import {Villain} from "../data/villain";

@Injectable()
export class VillainsService {

  private allVillians : Villain[] = [
    {
      id: '1',
      name: 'Whirlwind',
      addresses: [
        {street: '123 Main', city: 'Anywhere', state: 'CA', postcode: '4801'},
        {street: '456 Maple', city: 'Somewhere', state: 'VA', postcode: '2226'},
      ]
    },
    {
      id: '2',
      name: 'Bombastic',
      addresses: [
        {street: '789 Elm', city: 'Smallville', state: 'OH', postcode: '4501'},
      ]
    },
    {
      id: '3',
      name: 'Magneta',
      addresses: []
    },
  ];

  constructor() { }

  getVillains(filter: IVillainFilter = (x) => true):Villain[]{
    return this.allVillians.filter(x => filter(x));
  }

}

export interface IVillainFilter{
  (villain:Villain) : boolean;
}
