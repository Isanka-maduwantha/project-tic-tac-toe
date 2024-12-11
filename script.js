
let Gameboard ={
    gameboard:[],
    player1:{isEmpty:true,},
    player2:{isEmpty:true,},
    status:{}
}
// Factory function to create and store new players
function player(name){
    let score = 0;
    let isEmpty = false;
    let isTurn = true;
    return{
        name,
        
        
        createPlayer(){
            if(Gameboard.player1.isEmpty === true){
                let symbol = "X";
                let place = Gameboard.player1["place"]=[];
                
                Gameboard.player1 = {isEmpty,name,symbol,score,place,isTurn}
            }
            else if(Gameboard.player1.isEmpty !== true){
                let symbol = "O";
                let place=Gameboard.player2["place"]=[];
                
                Gameboard.player2 = {isEmpty,name,symbol,score,place,isTurn}
                
            }
            else {
                return console.log("Only Two Players are Allowed")
            }
        },
        move(num,player){
            
            let gameboardPlace = Gameboard.gameboard;
            if(gameboardPlace[num]=== undefined){

                if(player === "p1"){
                
                    gameboardPlace[num]="X";
                    Gameboard.player1.place.push(num);
                    
                   
                }
                else if(player === "p2"){
                    gameboardPlace[num]="O";
                    
                    Gameboard.player2.place.push(num);
                   
                }
            }
            else{
                window.alert("you cannot push same");
            }
    
        }
    }
}
// Check winners and similaraties

function checkWin(symbol){
    let gameboard = Gameboard.gameboard;
    function checkSimilars(){
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        const isWin = winningCombinations.some(combination =>{
            const [a,b,c] = combination;
            let checksimilaraties = gameboard[a] === symbol && gameboard[b] === symbol && gameboard[c] === symbol;
            let checkEmpties =  gameboard[a] !== undefined && gameboard[b] !== undefined && gameboard[c] !== undefined;
            if(checkSimilars === false && checkEmpties === true){
                return "draw";
            }
            else{
                return gameboard[a] === symbol && gameboard[b] === symbol && gameboard[c] === symbol;
            }
            
        
        })
        return isWin;
    }
    let isWin = checkSimilars();
    let playerWin=undefined;
    if(isWin===true && symbol==="X"){
        playerWin = Gameboard.player1.name;
        
        if(Gameboard.player1.score<3){
           
        Gameboard.player1.score += 1}
     

        
    }
    else if(isWin===true && symbol==="O"){
        playerWin = Gameboard.player2.name;
        
        if(Gameboard.player2.score<3){
           
        Gameboard.player2.score += 1}
    }



    

    
    return {
        isWin,
        playerWin,
        checkWinAllRounds(){
            if(Gameboard.player1.score===3){
                console.log("player 1 wins")
            }
            else if(Gameboard.player2.score===3){
                console.log("player 2 wins")
            }
        },

    };

}


// function to store player moves in gameboard


function game(symbol){
    
  
    let winCheck= checkWin(symbol);
 
   
    // console.log(winCheck)
    // console.log(  winCheck.isWin+" "+winCheck.playerWin);
    let winner ;
     if(winCheck.isWin===true && winCheck.playerWin === Gameboard.player1.name){
         console.log(player1.name);
         winner = player1.name;
     }
     else if(winCheck.isWin===true && winCheck.playerWin === Gameboard.player2.name){
         
         console.log(player2.name+" is Winner");
         winner=player2.name;
     }
     else if(winCheck.isWin ==='draw'){
        console.log(isWin);
     }

   
    

 winCheck.checkWinAllRounds()
    
    return{
        winner,
    }
  



    
}

// game("Kamal","ruchira");

let p1 = prompt("Player 1");
let p2 = prompt('Player 2');
let player1;
let player2;
if(p1===p2 && p1 !== undefined && p2!== undefined){
 window.alert("same  names");
 location.reload();
}
player1 = player(p1);
player2 = player(p2);
player1.createPlayer();
player2.createPlayer();
const cards = document.querySelectorAll(".card");


const domChange = domAllChange();
cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        if(Gameboard.gameboard[index]=== undefined){

            if(Gameboard.player1.isTurn===true){
                card.innerText=Gameboard.player1.symbol;
                Gameboard.player1.isTurn=false;
                Gameboard.player2.isTurn=true;
                // card.classList.toggle("player1");
                console.log(index);
                player1.move(index,"p1");
                let wins=game(Gameboard.player1.symbol);
                if(wins.winner === Gameboard.player1.name){
                    console.log(Gameboard.player1.name);
    
                    
                    
                    
                    setTimeout(()=>{
                        
                        domChange.createEmpty(cards);
                    }
                        ,1000
                    )
                    
                    
                }
                   
                
              
    
            }
            else if(Gameboard.player2.isTurn===true){
                card.innerText=Gameboard.player2.symbol;
                Gameboard.player2.isTurn=false;
                Gameboard.player1.isTurn=true;
                // card.classList.toggle("player2");
                console.log(index);
                player2.move(index,"p2");
                let wins = game(Gameboard.player2.symbol);
                
                if(wins.winner === Gameboard.player2.name){
                    // domChange.displayWinner(Gameboard.player1.name);
                    setTimeout(()=>{
                       
                     
                        domChange.createEmpty(cards);
                    }
                        ,1000
                    );
                   
                    
                }
                
            }
        }
        

        if(Gameboard.player1.score===3){
            console.log("Winner is here");
            domChange.displayWinner(Gameboard.player1.name,"won this round");
            Gameboard.player1.score=0;
            Gameboard.player2.score=0;
                    setTimeout(()=>{
                   
                             domChange.displayWinner(Gameboard.player1.name);

                    domChange.createEmpty(cards);
                }
                    ,1000
                );

        }
        else if(Gameboard.player2.score===3){
            domChange.displayWinner(Gameboard.player2.name,"won this round");
                    setTimeout(()=>{
                   
                    domChange.displayWinner(Gameboard.player1.name);

                    domChange.createEmpty(cards);
                    
                }
                    ,1000
                );
                Gameboard.player2.score=0;
                Gameboard.player1.score=0;
        }
       
       domChange.playerDetailsShow();
    });
});
const header = document.querySelector(".header");
const player1Details = document.querySelector(".player1");
const player2Details = document.querySelector(".player2");
function domAllChange(){
   return{

    createEmpty(elementsArray){
    elementsArray.forEach((card) =>{
        card.innerText ="";
    }
    
    )
    Gameboard.gameboard=[];
    Gameboard.player1.place=[];
    Gameboard.player2.place=[];
    Gameboard.player2.isTurn=true;
    Gameboard.player1.isTurn=true;
    },
    playerDetailsShow(){
    player1Details.innerHTML=`<span class="name">${Gameboard.player1.name}</span> Score ${Gameboard.player1.score} `;
    player2Details.innerHTML=`<span class="name">${Gameboard.player2.name}</span> Score ${Gameboard.player2.score}  `;
    },
    displayWinner(winner="",massage){
    const display = document.querySelector('.display');
    display.classList.toggle("displayWinner");
    display.innerText =`${winner} ${massage}`;
    }
   }

}



domChange.playerDetailsShow();