const cells=document.querySelectorAll('.game_cell');
const statusEl=document.querySelector('.gamestatus');
const restartBtn=document.querySelector('.gamerestart');
const startBtn=document.querySelector('.start');

let gameState=[
    '','','',
    '','','',
    '','',''
]
let currentPlayer;
let gameOn=false;

const winningStates = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function changePlayer(){
    currentPlayer=currentPlayer === 'X'?'0':'X';
}

function checkGameOver(){
   for(let i=0;i<winningStates.length;i++){
    const winningState=winningStates[i];
    const x=winningState[0];
    const y=winningState[1];
    const z=winningState[2];

    if( (gameState[x]!='')&& (gameState[x]===gameState[y] && gameState[y]===gameState[z])){
       statusEl.textContent=' Player '+ currentPlayer+' has won ';
       gameOn=false;
       return;
    }

   }
   if(gameState.includes('')===false){
    statusEl.textContent='Game ended in draw';
    gameOn=false;
   }
}

function onCellClick(){

    if(gameOn){
    console.log(this);//element on which the event(click) occured
    const cell=this;
    const idx=cell.getAttribute('data-cell-index');
    console.log(idx);
    if(gameState[idx]!==''){
        alert('invalid move');
        return;
    }

    gameState[idx]=currentPlayer;
    cell.textContent=currentPlayer;
    checkGameOver();
    changePlayer();
    }
}
function restart(){
   gameOn=true;
   currentPlayer='X';
   gameState=[
    '','','',
    '','','',
    '','',''
];
cells.forEach(
    function(cell){
        cell.textContent='';
    }
);
statusEl.textContent='';
}

function onhover(){
    cell.setAttribute("style", "background-color:blue;")
}
cells.forEach(
    function(cell){
        cell.addEventListener('click', onCellClick)
        cell.addEventListener('mouseover',onhover)
    }
   
);

restartBtn.addEventListener('click', restart);
startBtn.addEventListener('click' ,restart);