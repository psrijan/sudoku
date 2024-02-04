export let solveSudoku = (board : number[][], initialRow, initialCol) => {
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[0].length; c++) {
               if (board[r][c] != -1) {

                    for (let val = 1; val <= 9; val++) {
                        board[r][c] = val;

                        
                        
                    }
                
               } 

        }
    }
};



let isValid = (board : number[][], r, c) : any {
    let target = board[r][c];

}