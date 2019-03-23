// All the logic of the game Othello 
// logic for 2 player:
// player vs player 
// player vs pc

exports ={
    // function to create the matrix board of the game
    createBoard: (size) =>{
        let matrix = new Array(size);
        for(i=0; i<size; i++){
            matrix[i] = new Array(size);
            for(j=0; j<size; j++){
                if ((tam / 2 == i) & (tam / 2 == j)) {
                    matriz[i][j] = 1;
                } else if ((tam / 2 == i) & (tam / 2 - 1 == j)) {
                    matriz[i][j] = 2;
                } else if ((tam / 2 - 1 == i) & (tam / 2 == j)) {
                    matriz[i][j] = 2;
                } else if ((tam / 2 - 1 == i) & (tam / 2 - 1 == j)) {
                    matriz[i][j] = 1;
                } else {
                    matriz[i][j] = 0;
                }
            }
        }
        // return the matrix with the first 2 chips 
        return matrix;
    },

    // function to call each possible way to check the move
    checkMove: (row, col, player, size) =>{
        let up = false;
        let down = false;
        let left = false;
        let right = false;
        let upLeft = false;
        let upRight = false;
        let downLeft = false;
        let downRight = false;
        let player2;

        if(player === 1){
            player2 = 2;
        }
        else {
            player2 = 1;
        }
        
        // down-up  
        up = downUp(row - 1, col, player, player2);

        // up-down  
        down = upDown(row - 1, col, player, player2, size - 1);
    
        // right-left
        left = rightLeft(row, col - 1, player, player2, size - 1);

        // left-right
        right = leftRight(row, col + 1, player, player2, size - 1);

        // down-up-Left
        upLeft = downUpLeft(row - 1, col - 1, player, player2, size - 1);

        // down-up-right
        upRight = downUpRight(row - 1, col + 1, player, player2, size - 1);

        // up-down-left
        downLeft = upDownLeft(row + 1, col - 1, player, player2, size - 1);
     
        // up-down-right
        downRight = upDownRight(row + 1, col + 1, player, player2, size - 1);

        // check if exist a valid move
        if (up == true || down == true || left == true || right == true || upLeft == true || upRight == true || downLeft == true || downRight == true) {
            return true;
        }
         return false;

    },

    // function to calculate the actual score of the game
    score: (matrix, size) =>{
        let score = [0,0];
        for (i = 0; i < tam; i++) {
            for (j = 0; j < tam; j++) {
                if (matrix[i][j] == 1) {
                    score[0]+=1;
                } 
                else if (matrix[i][j] == 2) {
                    score[1]+=1;
                } 
            }
        }
        // the return is an Array with the 2 scores
        return score;  
    },

    winner: () => {

    },

    automaticPlay: () =>{

    }
};

// function to check the move down-up 
downUp = (matrix, row, col, player1, player2) => {
    var check = false;
    if (matrix[row][col] == player2) {
        while ((matrix[row][col] == player2) & (row > 0)) {
            row--;
        }

        if (matrix[row][col] == player1) {
            row++;

            while (matrix[row][col] == player2) {
                matrix[rowf][col] = player1;
                check = true;
                row++;
            }
        }
    }
    return check;
}

// function to check the move up-down 
upDown = (matrix, row, col, player1, player2, size) => {
    var check = false;
    if (matrix[row][col] == player2) {
        while ((matrix[row][col] == player2) & (row < size)) {
            row++;
        }
        if (matrix[row][col] == player1) {
            row--;
            while (matrix[row][col] == player2) {
                matrix[row][col] = player1;
                check = true;
                row--;
            }
        }
    }
    return check;
}

// function to check the move right-left 
rightLeft = (matrix, row, col, player1, player2, size) => {
    var check = false;
    if (matrix[row][col] == player2) {
        while ((matrix[row][col] == player2) & (row > 0) & (col > 0)) {
            row--;
            col--;
        }
        if (matrix[row][col] == player1) {
            row++;
            col++;
            while (matrix[row][col] == player2) {
                matrix[row][col] = player1;
                check = true;
                row++;
                col++;
            }
        }
    }
    return check;
}

// function to check the move left-right 
leftRight = (matrix, row, col, player1, player2, size) => {
    var check = false;
    if (matrix[row][col] == player2) {
        while ((matrix[row][col] == player2) & (row > 0) & (col < size)) {
            row--;
            col++;
        }
        if (matrix[row][col] == player1) {
            row++;
            col--;
            while (matrix[row][col] == player2) {
                matrix[row][col] = player1;
                check = true;
                row++;
                col--;
            }
        }
    }
    return check;
}

// function to check the move up-down-left 
upDownLeft = (matrix, row, col, player1, player2, size) => {
    var check = false;
    if (matrix[row][col] == player2) {
        while ((matrix[row][col] == player2) & (row < size) & (col > 0)) {
            row++;
            col--;
        }
        if (matrix[row][col] == player1) {
            row--;
            col++;
            while (matrix[row][col] == player2) {
                matrix[row][col] = player1;
                check = true;
                row--;
                col++;
            }
        }
    }
    return check;
}

// function to check the move up-down-right 
upDownRight = (matrix, row, col, player1, player2, size) => {
    var check = false;
    if (matrix[row][col] == player2) {
        while ((matrix[row][col] == player2) & (row < size) & (col < size)) {
            row++;
            col++;
        }
        if (matrix[row][col] == player1) {
            row--;
            col--;
            while (matrix[row][col] == player2) {
                matrix[row][col] = player1;
                check = true;
                row--;
                col--;
            }
        }
    }
    return check;
}
/*
// function to check the move up-down-right 
validMove = (matrix, row, col, player1, player2, size) => {
    var check = false;
    var destRow = row;
    var destCol = col;
    if (matrix[row][col] == player2) {
        switch (move){
            case 'up':
                while ((matrix[destRow][destCol] == player2) & (destRow > 0)) {
                    destRow--;
                }
    
                if (matrix[destRow][destCol] == player1) {
                    check = true;
                }
                else{
                    destRow = row;
                    destCol = col;
                }
                break;
            case 'down':
                while ((matrix[destRow][destCol] == player2) & (destRow < size)) {
                    destRow++;
                }
                if (matrix[destRow][destCol] == player1) {
                    check = true;
                }
                else{
                    destRow = row;
                    destCol = col;
                }
                break;
            case 'left':
                while ((matrix[destRow][destCol] == player2) & (destRow > 0) & (destCol > 0)) {
                    destRow++;
                    destCol++;
                }
                if (matrix[destRow][destCol] == player1) {
                    check = true;
                }
                else{
                    destRow = row;
                    destCol = col;
                }
                break;
            case 'right':
                while ((matrix[destRow][destCol] == player2) & (destRow > 0) & (destCol < size)) {
                    destRow--;
                    destCol++;
                }
                if (matrix[destRow][destCol] == player1) {
                    check = true;
                }
                else{
                    destRow = row;
                    destCol = col;
                }
                break;
        }
        while ((matrix[row][col] == player2) & (row < size) & (col < size)) {
            row++;
            col++;
        }
        if (matrix[row][col] == player1) {
            row--;
            col--;
            while (matrix[row][col] == player2) {
                matrix[row][col] = player1;
                check = true;
                row--;
                col--;
            }
        }
    }
    return check;
}*/
