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
    return matrix;
}

//function to check if the move is valid
exports.move = (matrix,row, col, player, size) => {
    let valid = false;
    if (matrix[row][col] == 0) {
        valid = checkMove(matrix, row, col, player, size);

        if (player == true) {
            matrix[row][col] = player;
            return {matrix:matrix,validate:true};
        } 
    }
};

// function to call each possible way to check the move
checkMove = (matrix, row, col, player, size)=>{
    let matrixRes = matrix;
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
        matrixRes, up = downUp(matrix, row - 1, col, player, player2);
    }

    // up-down 
    if (row != size - 1) { 
        matrixRes, down = upDown(matrix, row + 1, col, player, player2, size - 1);
    }

    // right-left
    if (col != 0) {
        matrixRes, left = rightLeft(matrix, row, col - 1, player, player2, size - 1);
    }

    // left-right   
    if (col != size - 1) {
        matrixRes, right = leftRight(matrix, row, col + 1, player, player2, size - 1);
    }

    // down-up-Left
    if ((row != 0) & (col != 0)) {
        matrixRes, upLeft = downUpLeft(matrix, row - 1, col - 1, player, player2, size - 1);
    }

    // down-up-right
    if ((row != 0) & (col != size - 1)) {
        matrixRes, upRight = downUpRight(matrix, row - 1, col + 1, player, player2, size - 1);
    }

    // up-down-left
    if ((row != size - 1) & (col != 0)) {
        matrixRes, downLeft = upDownLeft(matrix, row + 1, col - 1, player, player2, size - 1);
    }
    
    // up-down-right
    if ((row != size - 1) & (col != size - 1)) {
        matrixRes, downRight = upDownRight(matrix, row + 1, col + 1, player, player2, size - 1);
    }

    // check if exist a valid move
    if (up == true || down == true || left == true || right == true || upLeft == true || upRight == true || downLeft == true || downRight == true) {
        console.log(matrixRes);
        return matrixRes, true;
    }
        return matrixRes, false;
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
    
exports.winner =()=>{};

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
                matrix[rowf][col] = player1;
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
    console.log('---***', matrix, '****----', check);
    return matrix, check;
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
    console.log('---***', matrix, '****----', check);
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
