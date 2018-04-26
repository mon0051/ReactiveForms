import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Address, states} from "../data/address";
import {VillainsService} from "../services/villains.service";
import {Villain} from "../data/villain";

@Component({
  selector: 'app-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.scss']
})
export class VillainDetailComponent implements OnInit, OnChanges {
  private previousStates : Villain[] = [];
  @Input() villain;
  @Output('villainUpdate') villainUpdate = new EventEmitter();
  villainForm: FormGroup;
  states =  states;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();

  }

  ngOnChanges(){
    this.rebuildForm();
  }
  rebuildForm(){
    if(!this.villain) return;

    this.villainForm.reset({
      name: this.villain.name,
      secretLair: this.villain.addresses[0] || new Address()
    });
  }
  ngOnInit() {
  }

  createForm(){
    this.villainForm = this.formBuilder.group({
      name: ['', Validators.required],
      secretLair: this.formBuilder.group(new Address()),
      power:'',
      sidekick:''
    })
  }

  save(){
    this.previousStates.push(this.villain);
    this.villain = Object.assign({},
      this.villain,
      {
        name : this.villainForm.get('name').value,
        addresses : [
          {
            street : this.villainForm.get('secretLair.street').value,
            city : this.villainForm.get('secretLair.city').value,
            state : this.villainForm.get('secretLair.state').value,
            postcode : this.villainForm.get('secretLair.postcode').value
          },
          ...Object.assign([],this.villain.addresses.splice(1,this.villain.addresses.length))]

    });
  }

  cancel(){
    this.rebuildForm();
  }

  undo(){
    if(this.previousStates.length > 0){
      this.villain = this.previousStates.pop();
    }else{
      this.cancel();
    }
    this.rebuildForm();
  }

}
interface IProjection<TIn,TOut>{
  (tIn : TIn):TOut;
}
