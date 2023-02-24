
// =====================================
// Purpose: tic-tac-toe game JavaScript file

// By: BigBBazz

// Date created: 22/02/2023

// Latest edit date:
// =====================================

// ============= Player setup Code ==================

const setupInterface = document.querySelector('.setup-interface');
const setupParent = document.querySelector('.setup-parent');
const IconButtons = document.querySelectorAll('.material-icons');
const readyToPlayButton = document.querySelector('.readyToPlay');
const player1Image = document.querySelector('.player1image');
const player2Image = document.querySelector('.player2image');

let randomNumber;
let clickEventIndicator = 0;
let player1Icon;
let player2Icon;



function randomNumberFunc() {
  
    return Math.round(Math.random());
}


function handleUserIconClick(event) {

    let IcondClicked = event.target;

    if (clickEventIndicator>2) {

        return;
    }

    IcondClicked.style.height= "30%";

    if (clickEventIndicator == 0) { 

        randomNumber = randomNumberFunc();

        if (randomNumber == 0) {
            
            player1Icon =  IcondClicked.src;
        } else {

            player2Icon = IcondClicked.src;
        }
    } else {

        if (randomNumber == 0) {
            player2Icon =  IcondClicked.src;
        } else {
            player1Icon = IcondClicked.src;
        }
    }

    clickEventIndicator++;
}

function switchSetupGame() {

    const setupInterfaceChilds = setupInterface.children;
    const setupParentChilds = setupParent.children; 
    
    const gameInterfaceChilds = gameInterface.children;
    const gridChilds = grid.children;
    const trackingInterfaceChilds = trackingInterface.children;
    const playerChilds = players.children;
    const endButtonChilds = endButtons.children



    const sectionArrays = [setupInterfaceChilds,setupParentChilds,gameInterfaceChilds,gridChilds,trackingInterfaceChilds,playerChilds,endButtonChilds];

    sectionArrays.forEach(array => {
        
        for(let i=0; i<array.length; i++) {
        
            array[i].classList.toggle("hide");
        }
    });

    const playerIconArrays = [player1Icon,player2Icon];

    playerIconArrays.forEach(playerIcon => {

        player1Image.style.background = `url(${playerIcon})`;
        player1Image.style.backgroundSize = 'contain';
        player1Image.style.backgroundRepeat = "no-repeat";
        player1Image.style.backgroundPosition= "center";
    });
}


IconButtons.forEach(IconButton => {
    
    IconButton.addEventListener('click', (event) => {

        handleUserIconClick(event);
    })
});


readyToPlayButton.addEventListener('click', () => {

    if (clickEventIndicator<2){

        return
    }

    switchSetupGame();  
})





// ============= Gameplay Code ==================

const gameInterface = document.querySelector('.game-interface');
const grid = document.querySelector('.grid-parent');
const buttons = document.querySelectorAll('.grid-child');
const trackingInterface = document.querySelector('.tracking-interface');
const endButtons = document.querySelector('.endButtons');
const players = document.querySelector('.players');
const playAgainButton = document.querySelector('.playAgain');
const resetButton = document.querySelector('.reset');
const rounds = document.querySelector('.rounds');
const message = document.querySelector('.message');
const player1WinsTrack = document.querySelector('#player1tracker');
const player2WinsTrack = document.querySelector('#player2tracker');


let player1WinNum = 0;

let player2WinNum = 0;

let roundCounter = 0;

let totalRoundCounter = 0;

let player1Selections = [];

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
    
                for (let player2Selection of player2Selections) { 
                    
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

    if (roundCounter == 9) {

        message.textContent = `It's a draw!`;

        message.style.visibility = 'visible';

        playAgainButton.style.visibility = 'visible';

        resetButton.style.visibility = 'visible';
    }
} 



function handleUserClick(event) {

    let buttonClicked = event.target;

    if (buttonClicked.disabled) {

        return;
    }

    buttonClicked.setAttribute('disabled',true);

    roundCounter++;

    if (roundCounter % 2 !== 0) {

        buttonClicked.style.background = `url(${player1Icon})`;
        buttonClicked.style.backgroundSize = 'contain';
        buttonClicked.style.backgroundRepeat = "no-repeat";
        buttonClicked.style.backgroundPosition= "center";

    } else {

        buttonClicked.style.background = `url(${player2Icon})`;
        buttonClicked.style.backgroundSize = 'contain';
        buttonClicked.style.backgroundRepeat = "no-repeat";
        buttonClicked.style.backgroundPosition= "center";
    }
}


buttons.forEach(button => {

    button.addEventListener('click', (event) => {

        handleUserClick(event);
    
        addSelection(event);
    
        rounds.textContent = `Round number: ${roundCounter}`;
    
        rounds.style.visibility = 'visible';
    
        if(checkForWinner()) {
    
            playAgainButton.style.visibility = 'visible';

            resetButton.style.visibility = 'visible';
            
            if (roundCounter % 2 !== 0) {
    
                message.textContent = `Player 1 is the WINNER`;

                player1WinNum++;

                player1WinsTrack.textContent = `Player 1 wins: ${player1WinNum}`
            } else {
    
                message.textContent = `Player 2 is the WINNER`;
                
                player2WinNum++;

                player2WinsTrack.textContent = `Player 2 wins: ${player2WinNum}`;
            } 

            message.style.visibility = 'visible';
        };

        checkForDraw();
    })  
});


playAgainButton.addEventListener('click', () => {
    
    roundCounter = 0;
    player1Selections.length = 0;
    player2Selections.length = 0;
    buttonNumber == 1;
    randomNumber = null;
    clickEventIndicator = 0;

    buttons.forEach(button => {
        button.style.background = "";
        button.disabled = false;
        button.replaceChildren();
    });

    rounds.style.visibility = 'hidden';
    message.style.visibility = 'hidden';
    playAgainButton.style.visibility = 'hidden';
    resetButton.style.visibility = 'hidden';

});


resetButton.addEventListener('click', () => {

    switchSetupGame();
    
    roundCounter = 0;
    player1WinNum = 0;
    player2WinNum = 0;
    player1Selections.length = 0;
    player2Selections.length = 0;
    buttonNumber == 1;
    randomNumber = null;
    clickEventIndicator = 0;
    player1Icon = null;
    player2Icon = null;

    buttons.forEach(button => {
        button.style.background = "";
        button.disabled = false;
        button.replaceChildren();
    });

    IconButtons.forEach(IconButton => {
        IconButton.style.height = "35%";
    });

    rounds.style.visibility = 'hidden';
    message.style.visibility = 'hidden';
    playAgainButton.style.visibility = 'hidden';
    resetButton.style.visibility = 'hidden';
    player1WinsTrack.textContent = `Player 1 wins: ${player2WinNum}`;
    player2WinsTrack.textContent = `Player 2 wins: ${player2WinNum}`;
});
