import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {NgForm} from '@angular/forms';

import { IFlash } from './flash.model';
import { FlashService } from './flash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('flashForm', {static:true}) flashForm: NgForm;
  flash$: Observable<IFlash[]>;

  title = 'ng-flashcards';
  editing = false;
  editingId: number;
  flash = {
    question: '',
    answer: ''
  };

  flashs;

  constructor(private flashService: FlashService){}

ngOnInit(){
  this.flash$ = this.flashService.flashs$
}

ngOnDestroy(){

}

trackByFlashId(index, flash){
  return flash.id;
}

handleToggleCard(id: number){
  this.flashService.toggleFlash(id);
}

handleDelete(id: number){
  this.flashService.deleteFlash(id);
}

handleEdit(id: number){
  this.flash = this.flashService.getFlash(id);
  this.editing = true;
  this.editingId = id;
  //TODO: We will add editing logic after adding the form
}

handleUpdate(){
  this.flashService.updateFlash(this.editingId, this.flash);
  this.handleCancel();
}

handleCancel(){
  this.editing = false;
  this.editingId = undefined;
  this.handleClear();
}

handleRememberedChange({id, flag}){
  this.flashService.rememberedChange(id, flag);
}

handleSubmit(): void {
  this.flashService.addFlash(this.flash);
  this.handleClear();
}

handleClear(){
  this.flash = {
    question: '',
    answer: '',
  };
  this.flashForm.reset();
}
}

function getRandomNumber(){
  return Math.floor(Math.random() * 10000);
}
