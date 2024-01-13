import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  boardSize : number = 9;
  possibleNumbers = [1,2,3,4,5,6,7,8,9]
  boardMatrix: number[][];
  scoreVal : number = 0;
  timeMin : string = "00";
  timeSec : string = "00";

  curMistakes : number = 0;
  allMistakes : number = 3;
  
  difficulty: string = "Easy";

  constructor() {
    console.log(" board matrix initalizer");
    this.boardMatrix  = []; 

    for (let i = 0; i < 9; i++) {
        let row: number[] = new Array(9);
        row = row.fill(0,0,9);
        console.log(row);
        this.boardMatrix.push(row);
    }


  }


  numButtonClick(curNum : number) {


  }

}
