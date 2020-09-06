import { Injectable } from '@angular/core';
import { IFlash } from './flash.model';
import { BehaviorSubject } from 'rxjs';

function getRandomNumber()
{
  return Math.floor(Math.random() * 10000)
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {
  flashs: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: getRandomNumber(),
  },
  {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
  },
  {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
  }];

  flash = {
    question: 'question',
    answer: 'answer'
  }

  flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);

  addFlash(flash: {question: string, answer: string})
  {
    this.flashs.push({
      ...flash,
      show: false,
      id: getRandomNumber(),
    });
    this.flashs$.next(this.flashs);
  }

  toggleFlash(id: number)
  {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        show: !this.flashs[index].show
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);

    //const flash = this.flashs.find(flash => flash.id === id);
    //flash.show = !flash.show;
  }

  deleteFlash(id: number){
    const index = this.flashs.findIndex(flash => flash.id === id);

    this.flashs = [
      ...this.flashs.slice(0, index),
      ...this.flashs.slice(index + 1),
    ];

    this.flashs$.next(this.flashs);
    //const index = this.flashs.findIndex(flash => flash.id === id);
    //this.flashs.splice(index, 1);
  }

  rememberedChange(id: number, flag: 'correct' | 'incorrect'){
    const index = this.flashs.findIndex(flash => flash.id === id);

    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        remembered: flag
      },
      ...this.flashs.slice(index + 1),
    ];
    this.flashs$.next(this.flashs);

    //const flash = this.flashs.find(flash=> flash.id ===id);
    //flash.remembered = flag;
  }

  updateFlash(id, updatedFlash: {question: string, answer: string}){
    const index = this.flashs.findIndex(flash => flash.id ===id);

    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        ...updatedFlash,
      },
      ...this.flashs.slice(index + 1)
    ];

    this.flashs$.next(this.flashs);
    /*
    const flash = this.flashs.find(flash => flash.id === id);
    flash.question = updatedFlash.question;
    flash.answer = updatedFlash.answer;
    */
  }

  getFlash(id: number)
  {
    const flash = this.flashs.find(flash => flash.id === id);
    return flash;
  }

  constructor() { }
}
