var lastRenderTime = 0;
const SPEED = 2;
var pos = [];
var val = [];
var pok = 4;
var score = 0;
var status = 0;
var moving = 0;

function main(currentTime) {
	window.requestAnimationFrame(main);
	const secondSinceLastRender = (currentTime - lastRenderTime) / 1000;
	if(secondSinceLastRender < 1 / SPEED) return;

	console.log('Render');
	lastRenderTime = currentTime;
	update();
}

window.addEventListener('load', () => {
  	window.requestAnimationFrame(main);
 });

window.onload = function() {
	Start();
}

function Start() {
	board = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
	]
	for(var i = 0; i < 10; i++) {
		for(var j = 0; j < 20; j++) {
			var tile = document.createElement("div")
			tile.id = i.toString() + j.toString();
			var tmp = board[i][j];
			updateTile(tile,tmp);
			document.getElementById("board").append(tile);
 		}
	}
	createNewButtress();
}

function updateTile(tile,tmp) {
	tile.classList.value = "";
	tile.classList.add("tile")
	if(tmp==1) {
		tile.classList.add("char");
	}
	else if(tmp==2) {
		tile.classList.add("tunnel");
	}
}



function createNewButtress() {
	var rd = Math.floor(Math.random()*5) + 1;
	pos.push(19);
	val.push(rd);
	for(var i = 0; i<= rd-1; i++) {
		board[i][19] = 2;
		var tile = document.getElementById(i.toString() +"19");
		updateTile(tile,2);
	}
	for(var i = rd + 4; i <= 8; i++) {
		board[i][19] = 2;
		var tile = document.getElementById(i.toString() + "19");
		updateTile(tile,2);
	}
}

function checkBeforeMove(current_position) {
	for(i = 0; i<=8; i++) {
		if(board[i][current_position] == 2 && board[i][current_position-1] == 1) return false;
	}
	return true;
}

function moveButtress() {
    if (status == 0) {
    	if(pos[0]-1<0) {
        		for(var j = 0;j<=8;j++) {
	        			if(board[j][pos[0]] == 2) {
	        				board[j][pos[0]] = 0;
	        				var tile = document.getElementById(j.toString()+pos[0].toString());
							updateTile(tile,0);
	        			}
	        		}
	        		pos.splice(0,1);
	        		val.splice(0,1);
	        	}
        for(var i = 0; i < pos.length; i++) {

        		if(pos[i]==15) createNewButtress();
        		if(checkBeforeMove(pos[i])) {
	        		for(var j = 0;j<=8;j++) {
	        			if(board[j][pos[i]] == 2) {
	        				board[j][pos[i]] = 0;
	        				var tile = document.getElementById(j.toString()+pos[i].toString());
							updateTile(tile,0);
	        			}
	        		}
	        		pos[i]--;
	        		for(var j = 0; j<= val[i]-1; j++) {
						board[j][pos[i]] = 2;
						var tile = document.getElementById(j.toString() +pos[i].toString());
						updateTile(tile,2);
					}
					for(var j = val[i] + 4; j <= 8; j++) {
						board[j][pos[i]] = 2;
						var tile = document.getElementById(j.toString() + pos[i].toString());
						updateTile(tile,2);
					}
	        	}
	        	else status = 1;
        	}
        
    }
}



function update() {
		moveButtress();
	moveDown();
}

document.addEventListener("keyup", (e) => {
	if(e.code == "ArrowUp" ) {
		moving = 1;
		moveUp();
	}
})

function moveUp() {
	if(pok-1 >=0 && status == 0) {
		if(board[pok-1][9]==2) status = 1;
		else {
			board[pok][9] = 0;
			var tile = document.getElementById(pok.toString()+"9");
			updateTile(tile,0);
			pok-=1;
			board[pok][9] = 1;
			tile = document.getElementById(pok.toString()+"9");
			updateTile(tile,1);
		}
	}
	moving = 0;
}

function moveDown() {
	if(status == 0 && moving == 0) {
		if(board[pok+1][9]>1) status = 1;
		else {
			board[pok][9] = 0;
			var tile = document.getElementById(pok.toString()+"9");
			updateTile(tile,0);
			pok+=1;
			board[pok][9] = 1;
			tile = document.getElementById(pok.toString()+"9");
			updateTile(tile,1);
		}
	}
}