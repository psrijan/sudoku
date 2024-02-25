import { BlockModel } from "../models/model";


export class SudokuGenerator {

    
    sudokuMap = new Map<Difficulty, Array<number[][]>>(); 


    constructor() {
        this.sudokuMap.set(Difficulty.EASY, [] );
        this.sudokuMap.set(Difficulty.MEDIUM, []);
        this.sudokuMap.set(Difficulty.HARD, []);

        this.addEasyList();

    }

    addEasyList() {

        let easyList = this.sudokuMap.get(Difficulty.EASY);
        
        let first = [
            [1, 2, 3, 0, 5, 6, 7, 0, 9],
            [4, 5, 6, 7, 0, 0, 0, 0, 0],
            [0, 8, 0, 0, 2, 0, 0, 5, 6],
            [0, 0, 4, 0, 6, 5, 8, 9, 7],
            [3, 0, 0, 8, 9, 0, 2, 1, 0],
            [0, 0, 7, 2, 1, 4, 3, 6, 5],
            [5, 0, 1, 0, 4, 2, 9, 7, 0],
            [6, 0, 0, 0, 7, 0, 0, 3, 1],
            [9, 7, 8, 5, 3, 1, 6, 4, 0],
          ];

          easyList?.push(first);

    }


    public getSudoku(difficulty : Difficulty, index : number) {
        let sudokus = this.sudokuMap.get(difficulty);

        if (sudokus != null && sudokus.length > index) {
            let sudokuMatrix = sudokus[index];
            return this.generateBoard(sudokuMatrix);
        }
        return null;
    }

    private generateBoard(matrix : number[][]) {
        let board : BlockModel[][] = [];

        for (let i = 0; i < matrix.length; i++) {
            board.push([]);
            for (let j = 0; j < matrix.length; j++) {
                let curBlock = this.generateBlock(matrix[i][j], i, j);
                board[i].push(curBlock);
            }
        }
        return board;
    }

    private generateBlock(value, row, col) {
        let initialValue : BlockModel = {
          girdLocation : [row, col],
          isSelected : false,
          isSectionSelected : false,
          isPencilEnabled : false,
          penciledValue : -1,
          suppliedValue: -1,
          isChangeable : value != 0 ? true : false
        }
        return initialValue;
    
    }



}


export enum Difficulty {
    EASY,
    MEDIUM,
    HARD
}