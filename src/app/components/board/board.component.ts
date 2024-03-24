import { Component } from '@angular/core';
import { BlockModel, INITIAL_BOARD_VALUE, Result } from '../../models/model';
import { isBoardValid, isSameBlock, isSameSection } from '../../util/board.util';
import { Block } from '@angular/compiler';
import { min } from 'rxjs';
import { ThemesService } from '../../service/themes.service';
import {MatSliderModule} from '@angular/material/slider';
import { MatDialog } from '@angular/material/dialog';
import { DialogData, MsgDialogComponent, ThemeChoice } from '../dialog/msg-dialog.component';
import { Difficulty, SudokuSolver, SudokuValidator } from 'src/app/util/sudoku.generator.util';
import { SudokuGenerator } from 'src/app/util/sudoku.generator.util';
import * as _ from 'lodash';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  MATRIX_SIZE : number = 9;

  boardSize : number = 9;
  possibleNumbers = [1,2,3,4,5,6,7,8,9]
  boardMatrix: BlockModel[][];
  scoreVal : number = 0;
  timeMin : string = "00";
  timeSec : string = "00";

  curMistakes : number = 0;
  allMistakes : number = 3;
  
  difficulty: string = "Easy";
  hintCount : number = 3;

  selectedValue = 0;
  // selectedLoc[0] = ROW, selectedLoc[1] = COL
  selectedLoc : number[];
  
  pencilMode : boolean = false;
  pencilLabel : string = 'Off';
  startTime : Date; 

  currentThemeType : ThemeChoice.WHITE;
  currentFontSize : 1;

  difficultyLevel : Difficulty = Difficulty.EASY;
  matrixIndex : number = 0; // index of the matrix that is returned for the difficulty level. 

  generator : SudokuGenerator;
  validator : SudokuValidator;
  sudokuSolver : SudokuSolver;
  /* Is set to true, if any of the board index is invalid, 
  this value used to enable disable board
  */
  indexValid : boolean = true; 

  // holds the overall board result
  result : Result;

  constructor(private themeService : ThemesService,
    public dialog : MatDialog) {
    console.log("board matrix initalizer");
    this.boardMatrix  = []; 
    
    this.generator = new SudokuGenerator();
    this.validator = new SudokuValidator();
    this.sudokuSolver = new SudokuSolver();

    this.boardMatrix = this.generator.getSudoku(this.difficultyLevel, this.matrixIndex)

    this.startTime = new Date();

    setInterval(() => {
      let curTime : Date = new Date();
      let timeDiff = curTime.getTime() - this.startTime.getTime();
      let hours = Math.floor (timeDiff / (1000 * 60 * 60)) % 60; 
      let minutes = Math.floor( timeDiff / (1000 * 60)) % 60 ;
      let seconds = Math.floor( timeDiff / (1000)) % 60;
      this.timeMin = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
      this.timeSec = seconds < 10 ? "0" + seconds.toString() : seconds.toString();

    }, 1000);
    console.log("row: ", this.boardMatrix.length, " col: ", this.boardMatrix[0].length);
  }

  solveButtonClicked() {
    console.log("solve button clicked");
    this.sudokuSolver.solve(this.boardMatrix);
  }


  numBlockClick(selectedGridLoc : any) {
    console.log("num block clicked", selectedGridLoc);
    // change current selected

    if (!this.indexValid)
      return;

    this.selectedLoc = selectedGridLoc;

    for (let r = 0; r < this.MATRIX_SIZE; r++) {
      for (let c = 0; c < this.MATRIX_SIZE; c++) {
        let curblock = this.boardMatrix[r][c];
        curblock.isSelected = isSameBlock(curblock.girdLocation, this.selectedLoc);
        curblock.isSectionSelected = isSameSection( curblock.girdLocation ,this.selectedLoc);
      }
    }
  }

  pauseClicked() {
    console.log('Pause Clicked');
    let ddata : DialogData = {
      pause: {
        minStr : "12", 
        secStr : "12", 
        difficulty: "Easy", 
        hintHeader : "Wow Hopefully this is easy"
      }};

    // record the current minute and second and pause. 

    // once you resume then start a new timer add the current new time diff to the old one. 

  }

  themeChooserClicked() {
    console.log('Opening theme chooser');
    let ddata : DialogData = {theme: {type : this.currentThemeType , fontSize : this.currentFontSize}};
    const dialogRef = this.dialog.open(MsgDialogComponent , { data : ddata, height: '160px', width: '190px'});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('data: ' , result);
    });
  }

  getLoc(row : number, col : number) {
    return [row, col];
  }


  eraseClicked() {
    console.log('Erase Clicked');
    if (this.selectedLoc != null && this.selectedLoc.length == 2) {
      let curSelected : BlockModel = this.boardMatrix[this.selectedLoc[0]][this.selectedLoc[1]];
      curSelected.penciledValue = -1;
    } else {
      console.log('Erase Clicked: Not selected any grid item');
    }
  }

  pencilClicked() {
    console.log('Pencil clicked');
    this.pencilMode = ! this.pencilMode;
    this.pencilLabel = this.pencilMode ? 'On' : 'Off';
    console.log('Pencil Value: ', this.pencilMode);
  }

  smartHintClicked() {
    if (this.hintCount <= 0)
      return;

    let boardMatrixCopy = _.cloneDeep(this.boardMatrix);
    this.sudokuSolver.solve(boardMatrixCopy);
    
    let r = this.selectedLoc[0];
    let c = this.selectedLoc[1];

    console.log()

    this.boardMatrix[r][c].suppliedValue = boardMatrixCopy[r][c].suppliedValue;
    this.boardMatrix[r][c].isSuppliedValid = true;

    this.hintCount--;


    
  }

  undoClicked() {
    console.log("undo clicked");
    if (this.selectedLoc != null && this.selectedLoc.length == 2) {
      let curSelected : BlockModel = this.boardMatrix[this.selectedLoc[0]][this.selectedLoc[1]];
      curSelected.suppliedValue = INITIAL_BOARD_VALUE;
    } else {
      console.log('Erase Clicked: Not selected any grid item');
    }
  }

  numButtonClick(curNum : number) {
    console.log("Number: ", curNum);
    this.selectedValue = curNum;
    if (this.selectedLoc != null && this.selectedLoc.length == 2) {
      let selectedBlock : BlockModel = this.boardMatrix[this.selectedLoc[0]][this.selectedLoc[1]]; 
      if (this.pencilMode) {
        selectedBlock.penciledValue = this.selectedValue;
      } else {
        selectedBlock.suppliedValue = this.selectedValue;
        if (this.validator.isIndexValid(this.boardMatrix, this.selectedLoc[0], this.selectedLoc[1])) {
          this.scoreVal += 100;
          selectedBlock.isSuppliedValid = true;
          this.indexValid = true;
        } else {
          this.curMistakes++;
          selectedBlock.isSuppliedValid = false;
          this.indexValid = false;
        }
      }

      this.result = this.validator.isBoardValid(this.boardMatrix);
    } else {
      console.log('Num Click not being supplied to Block');
    }
  }
}

@Component({
  selector: 'font-slider',
  template: `
      <mat-slider min = "1" max = "5" step = ".5" value = "1.5">
        <input matSliderThumb>
      </mat-slider>
    `,
  styles: [``]
})
export class FontSlider { }