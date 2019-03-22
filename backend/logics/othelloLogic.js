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

    checkMove: () =>{

    },

    score: () =>{

    },

    winner: () => {

    },

    automaticPlay: () =>{

    }
};