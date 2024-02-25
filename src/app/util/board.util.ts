import { BlockModel } from "../models/model";

export let isSameBlock = (curIndex : number[], selectedIndex : number[]) => {
    return curIndex[0] == selectedIndex[0] && curIndex[1] == selectedIndex[1];
};

export let isSameSection = (curIndex : number[] , selectedIndex : number[]) => {
    if (curIndex[0] == selectedIndex[0] && curIndex[1] != selectedIndex[1]) {
        return true;
    } else if (curIndex[0] != selectedIndex[0] && curIndex[1] == selectedIndex[1]) {
        return true;
    } else if ( Math.floor(curIndex[0] / 3) == Math.floor(selectedIndex[0] / 3) 
    && Math.floor(curIndex[1] / 3) == Math.floor(selectedIndex[1] / 3)) {
        return true;
    }

    return false;

}

export class CheckValidSudoku {


    constructor() {}

    public test() {

    }

    public 



let dfs = (boardMatrix: BlocKModel[][], int rI, int cI) {
    if (rI >= boardMatrix.length) {
        isComplete = true;
    }
}


export let generateRandomBoard = (row, col) => {
    let MAX_ROW = 10;
    let MAX_COL = 20;
    
    let randRow = Math.floor(Math.random() * MAX_ROW);
    let randCol = Math.floor(Math.random() * MAX_COL);







}


}



export let isBoardValid = (boardMatrix : BlockModel[][] ) => {
    return true;
}