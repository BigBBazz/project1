
// =====================================
// Purpose: tic-tac-toe game JavaScript file

// By: BigBBazz

// Date created: 22/02/2023

// Latest edit date:
// =====================================

const grid = document.querySelector('.grid-parent');

const buttons = document.querySelectorAll('.grid-child');

const resetButton = document.querySelector('.reset');

const rounds = document.querySelector('.rounds');

const message = document.querySelector('.message');

let roundCounter = 0;

let player1Selections = [1,2,3];

let player2Selections = [];

const winnerArrays = [[1,2,3],[1,5,9],[1,4,7],[2,5,8],[3,6,9],[3,5,7],[4,5,6],[7,8,9]];

let buttonNumber = 1;



buttons.forEach(button => {

    button.setAttribute('data-gridNumber',buttonNumber);
    buttonNumber++;
});

function addSelection(event){

    let buttonClicked = event.target;
    
    if (roundCounter % 2 !== 0) {

        player1Selections.push(Number(buttonClicked.dataset.gridnumber));
    } else {

        player2Selections.push(Number(buttonClicked.dataset.gridnumber));
    }
}


function checkForWinner() {

    if (roundCounter < 5){

        return false;
    }
    
    if (roundCounter % 2 !== 0) {
        
        if (player1Selections.length>=3) {

            let winArrIndex = 0; 

            while(winArrIndex<winnerArrays.length) {

                let matchCounter = 0;
    
                for (let player1Selection of player1Selections) {
                    
                    if (winnerArrays[winArrIndex].indexOf(player1Selection)>-1) {

                        matchCounter++;
        
                        if (matchCounter == 3) {

                            return true;
                        }
                    }                       
                }

                winArrIndex++;
            }               
        } 
    } else {

        if (player2Selections.length>=3) {

            let winArrIndex = 0; 

            while(winArrIndex<winnerArrays.length) {

                let matchCounter = 0;
    
                for (let player2Selection of player2Selections) { //foreach doesnt work, won't return at line 105 if matchCounter ==3
                    
                    if (winnerArrays[winArrIndex].indexOf(player2Selection)>-1) {

                        matchCounter++;
        
                        if (matchCounter == 3) {

                            return true;
                        }
                    }      
                }

                winArrIndex++;
            }                        
        } 
    }    
}

function checkForDraw() {
    
    if (roundCounter == 9){

    message.textContent = `It's a draw!!`;
    message.style.visibility = 'visibile';
}
}

function handleUserClick(event) {

    let buttonClicked = event.target;

    if (buttonClicked.disabled) {

        return;
    }

    buttonClicked.setAttribute('disabled',true);

    roundCounter++;

    buttonClicked.classList.toggle("player1", roundCounter % 2 !== 0);

    buttonClicked.classList.toggle("player2", roundCounter % 2 == 0);
}

buttons.forEach(button => {

    button.addEventListener('click', (event) => {

        handleUserClick(event);
    
        addSelection(event);
    
        rounds.textContent = `Round number: ${roundCounter}`;
    
        rounds.style.visibility = 'visible';
    
        if(checkForWinner()) {
    
            resetButton.style.visibility = 'visible';
    
            if (roundCounter % 2 !== 0) {
    
                message.textContent = `Player 1 - WINNER`;
            } else {
    
                message.textContent = `Player 2 - WINNER`;   
            } 
        };

        checkForDraw();
    })  
});


resetButton.addEventListener('click', () => {

let roundCounter = 0;

let player1Selections = [];

let player2Selections = [];

rounds.style.visibility = 'hidden';

message.style.visibility = 'hidden';

resetButton.style.visibility = 'hidden';
})



