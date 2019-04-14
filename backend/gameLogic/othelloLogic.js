// All the logic of the game Othello 
// logic for 2 player:
// player vs player 
// player vs pc

// function to create the matrix board of the game
exports.createBoard = (size) => {
    let matrix = new Array(size);
    for(i=0; i<size; i++){
        matrix[i] = new Array(size);
        for(j=0; j<size; j++){
            if ((size / 2 == i) & (size / 2 == j)) {
                matrix[i][j] = 1;
            } else if ((size / 2 == i) & (size / 2 - 1 == j)) {
                matrix[i][j] = 2;
            } else if ((size / 2 - 1 == i) & (size / 2 == j)) {
                matrix[i][j] = 2;
            } else if ((size / 2 - 1 == i) & (size / 2 - 1 == j)) {
                matrix[i][j] = 1;
            } else {
                matrix[i][j] = 0;
            }
        }
    }
    // return the matrix with the first 2 chips 
    console.log(matrix)
    return matrix;
}

//function to check if the move is valid
exports.move = (matrix,row, col, player, size, autoPlayer, level) => {
    let valid = false;
    let matrixRes ='';

    if ((autoPlayer === true)&(player === 2)) {
        matrix, play = AutoPlayer(matrix, player, size, level);

        if (play == true) {
            return matrix, play;
        }
    }
    else {
        if (matrix[row][col] == 0) {
            matrixRes, valid = checkMove(matrix, row, col, player, size);

            if (valid == true) {
                matrix[row][col] = player;
                return matrix,true;
            } 
        }
    }
    return null, false;
};

// function to call each possible way to check the move
checkMove = (matrix, row, col, player, size)=>{
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
    if (row != 0) {
        matrix, up = downUp(matrix, row - 1, col, player, player2);
    }

    // up-down 
    if (row != size - 1) { 
        matrix, down = upDown(matrix, row + 1, col, player, player2, size - 1);
    }

    // right-left
    if (col != 0) {
        matrix, left = rightLeft(matrix, row, col - 1, player, player2, size - 1);
    }

    // left-right   
    if (col != size - 1) {
        matrix, right = leftRight(matrix, row, col + 1, player, player2, size - 1);
    }

    // down-up-Left
    if ((row != 0) & (col != 0)) {
        matrix, upLeft = downUpLeft(matrix, row - 1, col - 1, player, player2, size - 1);
    }

    // down-up-right
    if ((row != 0) & (col != size - 1)) {
        matrix, upRight = downUpRight(matrix, row - 1, col + 1, player, player2, size - 1);
    }

    // up-down-left
    if ((row != size - 1) & (col != 0)) {
        matrix, downLeft = upDownLeft(matrix, row + 1, col - 1, player, player2, size - 1);
    }
    
    // up-down-right
    if ((row != size - 1) & (col != size - 1)) {
        matrix, downRight = upDownRight(matrix, row + 1, col + 1, player, player2, size - 1);
    }

    // check if exist a valid move
    if (up == true || down == true || left == true || right == true || upLeft == true || upRight == true || downLeft == true || downRight == true) {
        console.log(matrix);
        return matrix, true;
    }
    return null, false;
};

// function to calculate the actual score of the game    
exports.score = (matrix, size) =>{
    let score = [0,0];
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
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
};

exports.winner =(player, matrix, size)=>{
    let move=false;
    let contr;

    if(player===1) {contr=2;}
    else {contr=1;}

    for (row = 0; row < size; row++) {
        for (col = 0; col < size; col++) {
            if (matrix[row][col] == 0) {
                return move = validMove(matrix, row, col, player, contr, size - 1);
            } 
      }
    } 

    return move;  
};

exports.automaticPlay =()=>{};
        

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
                matrix[row][col] = player1;
                check = true;
                row++;
            }
        }
    }
    return matrix, check;
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
    return matrix, check;
}

// function to check the move right-left 
rightLeft = (matrix, row, col, player1, player2, size) => {
    var check = false;
    if (matrix[row][col] == player2) {
        while ((matrix[row][col] == player2) & (col > 0)) {
            col--;
        }
        if (matrix[row][col] == player1) {
            col++;
            while (matrix[row][col] == player2) {
                matrix[row][col] = player1;
                check = true;
                col++;
            }
        }
    }
    return matrix, check;
}

// function to check the move left-right 
leftRight = (matrix, row, col, player1, player2, size) => {
    var check = false;
    if (matrix[row][col] == player2) {
        while ((matrix[row][col] == player2) & (col < size)) {
            col++;
        }
        if (matrix[row][col] == player1) {
            col--;
            while (matrix[row][col] == player2) {
                matrix[row][col] = player1;
                check = true;
                col--;
            }
        }
    }
    return matrix, check;
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
    return matrix, check;
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
    return matrix, check;
}

// function to check the move down-up-left 
downUpLeft = (matrix, row, col, player1, player2, size) => {
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
    return matrix, check;
}

// function to check the move down-up-right 
downUpRight = (matrix, row, col, player1, player2, size) => {
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
    return matrix, check;
}


// function to check if exist a move 
validMove = (matrix, row, col, player, contr, size) => {
    var check = false;
    var movPoints=0;
    var points= 0;

    var destRow = row-1;
    var destCol = col;

    if (destRow >= 0 ) {
        if((matrix[destRow][destCol] == contr)){
        
            while ((matrix[destRow][destCol] == contr) & (destRow > 0)) {
                destRow--;
                points++;
            }
            if (matrix[destRow][destCol] == player) {
                check= true;
                points++;
                movPoints += points;
                points = 0;
            } else {
                points = 0;
            } 
        }
    }
    destRow = row+1;
    
    if (destRow <= size) {
        if((matrix[destRow][destCol] == contr)){

            while ((matrix[destRow][destCol] == contr) & (destRow <= size)) {
                destRow++;
                points++;
            }
            if (matrix[destRow][destCol] == player) {
                check= true;
                points++;
                movPoints += points;
                points = 0;
            } else {
                points = 0;
            } 
        }
    }
    destCol = col-1;
    destRow = row;
    if (destCol >= 0) {
        if((matrix[destRow][destCol] == contr)){
            while ((matrix[destRow][destCol] == contr) & (destCol > 0)) {
                destCol--;
                points++;
            }
            if (matrix[destRow][destCol] == player) {
                check= true;
                points++;
                movPoints += points;
                points = 0;
            } else {
                points = 0;
            } 
        }
    }
    destCol = col+1;
    if (destCol <= size)  {
        
        if((matrix[destRow][destCol] == contr)){   
        
            while ((matrix[destRow][destCol] == contr) & (destCol <= size)) {
                destCol++;
                points++;
            }
            if (matrix[destRow][destCol] == player) {
                check= true;
                points++;
                movPoints += points;
                points = 0;
            } else {
                points = 0;
            } 
        }
    }  
    destRow = row-1;
    destCol = col-1;  

    if ((destRow >= 0) & (destCol >= 0))  {
        if((matrix[destRow][destCol] == contr)){  
            while ((matrix[destRow][destCol] == contr) & (destRow > 0) & (destCol > 0)) {
                destRow--;
                destCol--;
                points++;
            }
            if (matrix[destRow][destCol] == player) {
                check= true;
                points++;
                movPoints += points;
                points = 0;
            } else {
                points = 0;
            } 
        }
    }
    destRow = row+1;
    destCol = col-1;
    if ((destRow <= size) & (destCol >= 0))  {
        if((matrix[destRow][destCol] == contr)){ 
            while ((matrix[destRow][destCol] == contr) & (destRow < size) & (destCol > 0)) {
                destRow++;
                destCol--;
                points++;
            }
            if (matrix[destRow][destCol] == player) {
                check= true;
                points++;
                movPoints += points;
                points = 0;
            } else {
                points = 0;
            } 
        }
    }    
    destRow = row-1;
    destCol = col+1;
    if ((destRow >= 0) & (destCol <= size))  {
        if((matrix[destRow][destCol] == contr)){  
            while ((matrix[destRow][destCol] == contr) & (destCol < size) & (destCol > 0)) {
                destCol++;
                destRow--;
                points++;
            }
            if (matrix[destRow][destCol] == player) {
                check= true;
                points++;
                movPoints += points;
                points = 0;
            } else {
                points = 0;
            } 
        }
    }
    destRow = row+1;
    destCol = col+1;
    if ((destRow <=size) & (destCol<=size))  {
        if((matrix[destRow][destCol] == contr)){  
        
            while ((matrix[destRow][destCol] == contr) & (destCol < size) & (destCol < size)) {
                destCol++;
                destCol++;
                points++;
            }
            if (matrix[destRow][destCol] == player) {
                check= true;
                points++;
                movPoints += points;
                points = 0;
            } else {
                points = 0;
            } 
        }      
    }

    return {movPoints:movPoints, check:check};
}

AutoPlayer = (matrix, player, size, level) => {
    var valMov;
    let finalMov=0;
    let contr;
    let row=0;
    let col=0;
    let rand=0;

    if(player===1)contr=2;
    else contr=1;

    for (r = 0; r < size; r++) {
        for (c = 0; c < size; c++) {
            if (matrix[r][c] == 0) {
                valMov = validMove(matrix, r, c, player, contr, size-1);

                rand = Math.floor(Math.random() * 2) + 1; 

                if (level == 1) {
                    if ((valMov.movPoints != 0) ) {
                        if (finalMov == 0) {
                            finalMov = valMov.movPoints;
                            row = r;
                            col = c;
                        } else {
                            if (rand == 1 & (valMov.movPoints <= finalMov)) {
                                finalMov = valMov.movPoints;
                                row = r;
                                col = c;
                            }
                        }
                    }
                }

                if (level == 2) {
                    if (valMov.movPoints != 0) {
                        if (finalMov == 0) {
                            finalMov = valMov.movPoints;
                            row = r;
                            col = c;
                        } else {
                            if (rand == 1) {
                                finalMov = valMov.movPoints;
                                row = r;
                                col = c;
                            }
                        }
                    }
                }

                if (level == 3) {
                    if ((valMov.movPoints != 0) & (valMov.movPoints >= finalMov)) {
                        if (finalMov == 0) {
                            finalMov = valMov.movPoints;
                            row = r;
                            col = c;
                        } else {
                            if (rand == 1) {
                                finalMov = valMov.movPoints;
                                row = r;
                                col = c;
                            }
                        }
                    }
                }
            }
        }
    }
    if ((row == 0) & (col == 0) & (matrix[row][col] != 0)) {
        return false;
    }

    valMov = checkMove(matrix, row, col, player, size-1);

    if (valMov === true) {
        matrix[row][col] = player;
        return true;
    } else {
        return false;
    }

}
