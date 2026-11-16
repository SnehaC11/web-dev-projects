let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#computer-score");


const genComputerChoice =() =>{
    const options = ["Rock", "Paper", "Scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame =() => {
    msg.innerText = "Game Draw. Play Again !";
    msg.style.backgroundColor = "black";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} Beated ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        computerScore++;
        compScorePara.innerText = computerScore;
        msg.innerText = `You Lost! ${compChoice} Beated Your ${userChoice}`;
        msg.style.backgroundColor = "maroon";
    }
};

const playGame = (userChoice) => {
    //generate computer choice
    const compChoice = genComputerChoice();

    if (userChoice === compChoice) {
        //draw game
        drawGame();
    } else{
        let userWin = true;
        if (userChoice === "Rock") {
            userWin = compChoice ==="Paper" ? false : true;
        } else if(userChoice === "Paper"){
            userWin = compChoice ==="Scissor" ? false : true;
        }else{
            userWin = compChoice === "Rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click",() => {
        const userChoice = choice.getAttribute("id");   
        playGame(userChoice);
    });
});



