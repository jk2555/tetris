//make board
//make pieces
//randomly select a piece
//make piece fall
//user input (left, right)(turn)
//check line
//check lost

var tInd = 0;
var grid = [];
var timer;
var pause = false;
var pointX,pointY;


//makes empty 2D array representation of board
function makeArrays(){
    grid = new Array(length);
    for (var i = 0; i < 20; i++){
        grid[i] = new Array(10).fill(0);
    }
}
makeArrays();

var I = {arr:[  [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0]],
         color: "lightblue"};
var O = {arr:[  [0,1,1],
                [0,1,1],
                [0,0,0]],    
         color: "yellow"};
var T = {arr:[  [0,1,0],
                [1,1,1],
                [0,0,0]],    
         color: "purple"};
var J = {arr:[  [1,0,0],
                [1,1,1],
                [0,0,0]],    
         color: "blue"};   
var L = {arr:[  [0,0,1],
                [1,1,1],
                [0,0,0]],    
         color: "orange"};   
var S = {arr:[  [0,1,1],
                [1,1,0],
                [0,0,0]],    
         color: "green"};   
var Z = {arr:[  [1,1,0],
                [0,1,1],
                [0,0,0]],    
         color: "red"};   
var tetrominoes = [I,O,T,J,L,S,Z];
shuffle(tetrominoes);

function getPiece(){
    tInd++;
    if(tInd == 8){
        shuffle(tetrominoes);
        tInd = 1;
        return tetrominoes[0];
    }
    else{
        return tetrominoes[tInd-1];   
    }
}

var piece;
var a = [];

function shuffle(arr) {
    for(var i = arr.length -1; i>0; i--){
        var j = Math.floor(Math.random()*(i+1));
        var x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}

function start(){
    putPiece();
    document.getElementById("start").disabled = true;
    window.addEventListener('keydown',function(event){
        switch(event.key){
            case "Escape":
                pause();
                break;
            case "z":
                rotateL();
                break;
            case "c":
                hold();
                break;
            case "ArrowUp":
                rotateR();
                break;
            case " ":
                hardDrop();
                break;
            case "ArrowLeft":
                move(event.key,0,-1);
                break;
            case "ArrowRight":
                move(event.key,0,1);
                break;
            case "ArrowDown":
                move(event.key,1,0);
                break;
        }
    })
}

function pause(){
    pause = true;
}
function putPiece(){
    piece = getPiece();
    pointX = 0;
    pointY = 3;
    for(var i =0;i<piece.arr.length;i++){
        for(var j = 0;j<piece.arr.length; j++){
            if (piece.arr[i][j] == 1){
                document.getElementById(i+" "+(j+3)).style.backgroundColor = piece.color;
                grid[i][j+3] = 2;
                a.push(i*10+j+3);
            }
        }
    }
    timer = setInterval(drop,500); 
}

function drop(){
    if (canMove("ArrowDown")){
        move("ArrowDown",1,0);
    }
    else{
        clearInterval(timer);
        setTimeout(function(){},1000);
        set();  
    }
}

function set(){
    console.log("set");
    for(var x = a.length-1; x>=0; x--){
        var i = Math.floor(a[x]/10);
        var j = a[x]%10;
        grid[i][j]=1;
    }
    a=[];
    putPiece();
}



function rotateR(){
    if(piece == O){
        console.log("o");
        return;
    }
    var n = piece.arr.length;
    for(var i = 0;i < Math.floor(n/2); i++){
        for( var j = i; j< n-1-i;j++){
            var temp = grid[i+pointX][j+pointY];
            grid[i+pointX][j+pointY] = grid[n-j-1+pointX][i+pointY];
            grid[n-j-1+pointX][i+pointY] = grid[n-i-1+pointX][n-j-1+pointY];
            grid[n-i-1+pointX][n-j-1+pointY] = grid[j+pointX][n-1-i+pointY];
            grid[j+pointX][n-i-1+pointY] = temp;
        }
    }
    a=[];
    for(var i = pointX; i<pointX+n; i++){
        for(var j = pointY; j < pointY+n; j++){
            if(grid[i][j]==2){
                a.push(i*10+j);
            }
        }
    }
    display();
    console.log("rR");
}

function display(){
    var n = piece.arr.length;
    for(var i = pointX-1; i < pointX+n+1; i++){
        for(var j = pointY-1; j<pointY+n+1; j++){
            if(!(i<0 || i>19 || j<0 || j>9)){
                if(grid[i][j]==2){
                    document.getElementById(i+" "+j).style.backgroundColor = piece.color;
                }
                else if(grid[i][j]==0){
                    document.getElementById(i+" "+j).style.backgroundColor = "black";
                }
            } 
        }
    }
}
function rotateL(){
    if(piece == O){
        console.log("o");
        return;
    }
    var n = piece.arr.length;
    for(var i = 0;i < Math.floor(n/2); i++){
        for( var j = i; j< n-1-i;j++){
            var temp = grid[i+pointX][j+pointY];
            grid[i+pointX][j+pointY] = grid[j+pointX][n-i-1+pointY];
            grid[j+pointX][n-i-1+pointY] = grid[n-i-1+pointX][n-j-1+pointY];
            grid[n-i-1+pointX][n-j-1+pointY] = grid[n-j-1+pointX][i+pointY];
            grid[n-j-1+pointX][i+pointY] = temp;
        }
    }
    display();
    console.log("rL");
}

function canRotate(){

}
function hold(){
    console.log("hold");
}    

function move(dir,iShift, jShift){
    if(canMove(dir)){
        for(var x = 0; x < 4; x++){
            var i = Math.floor(a[x]/10);
            var j = a[x]%10;           
            grid[i][j]=0;  
            a[x]+=iShift*10+jShift;
        }
        for(var x = 0; x < 4; x++){
            var i = Math.floor(a[x]/10);
            var j = a[x]%10;           
            grid[i][j]=2;
        }
        switch(dir){
            case "ArrowLeft":
                pointY--;
                break;
            case "ArrowRight":
                pointY++;
                break;
            case "ArrowDown":
                pointX++;
                break;
        }
    }
    display(iShift,jShift);
    console.log(grid);
}

function canMove(dir){
    for(var i = pointX; i < pointX + piece.arr.length; i++ ){
        for(var j = pointY; j < pointY + piece.arr.length; j++){
            if(i<20){
                if(grid[i][j] == 2){
                    switch(dir){
                        case "ArrowLeft":
                            if(j==0 || grid[i][j-1]==1){
                                return false;
                            }
                            break;
                        case "ArrowRight":
                            if(j==9 || grid[i][j+1]==1){
                                return false;
                            }
                            break;
                        case "ArrowDown":
                            if(i==19 || grid[i+1][j]==1){
                                return false;
                            }
                            break;
                    }
                }
            }
        }
    }
    return true;
}



function hardDrop(){
    console.log("hd");
    while(canMove("ArrowDown")){
        move("ArrowDown",1,0);
    }
    set();
}

function checkLose(){

}

