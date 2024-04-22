import { BlockModel, INITIAL_BOARD_VALUE, MAX_COL_WIDTH, ResultBuilder, ResultEnum } from "../models/model";

export class SudokuValidator {

    MAX_SUDOKU_ROW = 9;
    MAX_SUDOKU_COL = 9;

    INITIAL_BOARD_VALUE = 0;

    constructor() {}

    //scenario check that the whole board is valid

    // check that a particular inserted value is valid.


    public isBoardValid(board: BlockModel[][]) {
        
        for (let r = 0; r < this.MAX_SUDOKU_ROW; r++) {
            for (let c = 0; c < this.MAX_SUDOKU_COL; c++) {
                let value = board[r][c].suppliedValue;
                if (value == this.INITIAL_BOARD_VALUE)
                    return new ResultBuilder().status(ResultEnum.INCOMPLETE)
                .message("The board is not complete yet")
                .build();
            }
        }



        for (let r = 0; r < this.MAX_SUDOKU_ROW; r++) {
            for (let c = 0; c < this.MAX_SUDOKU_COL; c++) {
                let isCurIndexValid = this.isIndexValid(board, r, c);

                if (!isCurIndexValid) {
                    return new ResultBuilder().status(ResultEnum.ERROR)
                    .message("There are indexes that don't have valid value")
                    .errorIndex([r,c])
                    .build();
                }

            }
        }

        return new ResultBuilder().status(ResultEnum.COMPLETE)
        .message("Board Complete")
        .build();

    }


    public isIndexValid (board : BlockModel[][], targetRow, targetColumn) : boolean {
        let rowVals = new Set<Number> (); 
        let colVals = new Set<Number> (); 
        let blockVals = new Set<Number> ();


        for (let r = 0; r < this.MAX_SUDOKU_ROW; r++) {
            let curModel : BlockModel = board[r][targetColumn];
            // targetRow should not be equal to r because we are checking if the value is present in other row vals
            if (targetRow != r && curModel.suppliedValue != this.INITIAL_BOARD_VALUE) {
                rowVals.add(curModel.suppliedValue); 
            }
        }

        for (let c = 0; c < this.MAX_SUDOKU_COL; c++) {
            let curModel : BlockModel = board[targetRow][c];
            // targetColumn should not be equal to c because we are cehcking if the value is present in other col vals
            if (targetColumn != c  && curModel.suppliedValue != this.INITIAL_BOARD_VALUE) {
                colVals.add(curModel.suppliedValue)
            }
        }

        let rowMul = Math.floor(targetRow / 3);
        let colMul = Math.floor(targetColumn / 3);

        let startR = rowMul * 3; 
        let startC = colMul * 3;
        
        for (let r = startR; r < startR + 3; r++) {
            for (let c = startC; c < startC + 3; c++) {
                let curModel : BlockModel  = board[r][c];
                if ((targetColumn == c && targetRow == r) || curModel.suppliedValue == this.INITIAL_BOARD_VALUE) {
                    continue;
                }
                blockVals.add(curModel.suppliedValue);
            }
        }

        let targetModel = board[targetRow][targetColumn];
        let targetVal = targetModel.suppliedValue;
        console.log("RowVals:", rowVals);
        console.log("ColVals: ", colVals);
        console.log("BlockVals: ", blockVals);
        console.log("TargetVal: ", targetVal);

        return !rowVals.has(targetVal) && !colVals.has(targetVal) && !blockVals.has(targetVal);
    }
    
    isValid (board : number[][], r, c) : any {
        let target = board[r][c];
        
    
    }

}

export class SudokuSolver {

    private isComplete = false;
    private sudokuValidator : SudokuValidator;

    constructor() {
        this.sudokuValidator = new SudokuValidator();
    }

    private dfs(board : BlockModel[][], rI : number, cI : number) {
        if (rI >= board.length) {
            this.isComplete = true;
            return;
        }

        console.log(`[rI,cI]: [${rI},${cI}]`);
        console.log(`curVal`, board[rI][cI]);

        let fillIndex : boolean = (board[rI][cI].suppliedValue == INITIAL_BOARD_VALUE);

        if (fillIndex) {
            console.log('iffing out ');
            for (let val = 1; val < 10 && !this.isComplete; val++) {
                board[rI][cI].suppliedValue = val;
                const isCurrentIndexValid : boolean = this.sudokuValidator.isIndexValid(board, rI, cI);
                console.log("Current Index Valid: ", isCurrentIndexValid);
                if (isCurrentIndexValid) {
                    let nextRow = rI + (Math.floor((cI + 1) / MAX_COL_WIDTH));
                    let nextCol = (cI + 1) % MAX_COL_WIDTH;
                    this.dfs(board, nextRow, nextCol)
                    //setTimeout(() =>   this.dfs(board, nextRow, nextCol), 500);
                   
                    if (this.isComplete)
                        return;
                    else // condition for backtracking 
                        board[rI][cI].suppliedValue = INITIAL_BOARD_VALUE;
                } else {
                    board[rI][cI].suppliedValue = INITIAL_BOARD_VALUE;
                }
            }
        } else {
            let nextRow = rI + (Math.floor((cI + 1) / MAX_COL_WIDTH));
            let nextCol = (cI + 1) % MAX_COL_WIDTH;
            this.dfs(board, nextRow, nextCol)
            console.log('elsing out ' + '[nR, nC]' + '[' + nextRow + "," + nextCol+ ']');
            //setTimeout(() => this.dfs(board, nextRow, nextCol), 500);
        }
    }

    public solve(board : BlockModel[][]) {
        this.isComplete = false;
        console.log("Board: ", board);
        this.dfs(board, 0, 0);

    }
}


/**
 * Returns the initial 20 sudokus
 */
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

    public getSudoku(difficulty : Difficulty, index : number): BlockModel[][]{
        let sudokus = this.sudokuMap.get(difficulty);

        if (sudokus != null && sudokus.length > index) {
            let sudokuMatrix = sudokus[index];
            return this.generateBoard(sudokuMatrix);
        }
        throw new Error(`Sudoku Grid with the Difficulty: ${difficulty} and index: ${index} not found`);
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
          suppliedValue: value,
          isChangeable : value != 0 ? true : false,
          isSuppliedValid : true
        }
        return initialValue;
    }
}


export enum Difficulty {
    EASY,
    MEDIUM,
    HARD
}