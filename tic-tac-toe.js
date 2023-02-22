
// =====================================
// Purpose: tic-tac-toe game JavaScript file

// By: BigBBazz

// Date created: 22/02/2023

// Latest edit date:
// =====================================



const grid = document.querySelector('.grid-parent');

const buttons = document.querySelectorAll('.grid-child');

let roundNumber = 1;

let player1buttons = [];

let player2buttons = [];

winnerArrays = {

    winArray1 : [1,2,3],
    winArray2 : [1,5,9],
    winArray3 : [1,4,7],
    winArray4 : [2,5,8],
    winArray5 : [3,6,9],
    winArray6 : [3,5,7]
}

let buttonNumber = 1;

buttons.forEach(button => {

    button.setAttribute('data-buttonNumber',buttonNumber);
    buttonNumber++;
});


function winnerArrayFunc () {

    if (roundNumber % 2 == 0) {

        player1buttons.push(buttonClicked.dataset.buttonNumber)
    }
}

function handleUserClick (event) {

    let buttonClicked = event.target;

    if (buttonClicked.disabled) {

        return;
    }

    buttonClicked.setAttribute('disabled',true);

    roundNumber++;

    buttonClicked.classList.toggle("player1", roundNumber % 2 == 0);

    buttonClicked.classList.toggle("player2", roundNumber % 2 != 0);
    
}


// button.addEventListener('click', handleUserClick)

grid.addEventListener('click', handleUserClick)




