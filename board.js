function generateBoard(size = 10){
	/**********************/
	/* Generate Game Board 
	/**********************/
	let padding = 50;
	let boxSize = 32; //2px for border

	let container = document.getElementById('board-container');
	let gameBoard = document.getElementById('game-board');
	let leftBoard = document.getElementById('left-board');
	let topBoard = document.getElementById('top-board');

	let res = [];

	for(let i = 0; i < size; i++){
		let temp = [];
		for(let j = 0; j < size; j++){

			// if 0, 0 => blank
			// if 0, x => top
			// if x, 0 => left

			let num = Math.round(Math.random());
			temp.push(num)
			let div = document.createElement('div');
			div.setAttribute('class', 'box-game box');
			div.setAttribute('id', `main-${i}-${j}`);
			div.addEventListener('click', function(){
				document.getElementById(div.id).style.backgroundColor = 'black';
				checkState(div.id, size);
				checkWin(size);
			}, false);
			div.addEventListener('contextmenu', function(ev){
				ev.preventDefault();
				document.getElementById(div.id).style.backgroundColor = 'white';
				checkState(div.id, size);
				checkWin(size);
				return false;
			}, false);
			// div.innerHTML = num; // comment this
			gameBoard.appendChild(div);
		}

		res.push(temp);
	}

	gameBoard.style.width = (boxSize * size) + 'px';

	// console.log(res);

	res = [
			[0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
			[0, 1, 1, 0, 1, 1, 0, 0, 0, 0],
			[0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
			[1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
			[0, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
			[1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
			[1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
			[0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
			[0, 1, 1, 0, 1, 1, 1, 1, 0, 0]
		]

	/************************/
	/* Count & Generate hint 
	/************************/
	let leftArr = [];
	let topArr = [];

	for(let i = 0; i < res.length; i++){
		let tempTop = [];
		let tempLeft = [];
		let blackH = false;
		let blackV = false;
		let countH = 0;
		let countV = 0;
		let hintIndexH = 0;
		let hintIndexV = 0;

		let leftDiv = document.createElement('div');
		leftDiv.setAttribute('id', `left-${i}`);
		leftBoard.appendChild(leftDiv);

		let topDiv = document.createElement('div');
		topDiv.setAttribute('id', `top-${i}`);
		topBoard.appendChild(topDiv);

		for(let j = 0; j <= res.length; j++){
			// set horizontal hint

			if(j === res.length){
				if(res[i][j-1] === 1){
					let div = document.createElement('div');
					div.setAttribute('id', `left-${i}-${hintIndexH}`);
					div.setAttribute('class', 'hint-box');
					div.innerHTML = countH;
					document.getElementById(`left-${i}`).appendChild(div);

					tempLeft.push(countH);
					countH = 0;
					blackH = false;
				}
			}
			else{
				if((j === res.length && blackH === true) || (blackH === true && res[i][j] === 0)){
					let div = document.createElement('div');
					div.setAttribute('id', `left-${i}-${hintIndexH}`);
					div.setAttribute('class', 'hint-box');
					div.innerHTML = countH;
					document.getElementById(`left-${i}`).appendChild(div);

					tempLeft.push(countH);
					countH = 0;
					blackH = false;

					hintIndexH++;
				}
				else if((blackH === false && res[i][j] === 1) || (blackH === true && res[i][j] === 1)){
					countH++;
					blackH = true;
				}
			}

			// set vertical hint
			if(j === res.length){
				if(res[j-1][i] === 1){
					let div = document.createElement('div');
					div.setAttribute('id', `top-${i}-${hintIndexV}`);
					div.setAttribute('class', 'hint-box');
					div.innerHTML = countV;
					document.getElementById(`top-${i}`).appendChild(div);

					tempTop.push(countV);
					countV = 0;
					blackV = false;
				}
			}
			else{
				if(blackV === true && res[j][i] === 0){
					let div = document.createElement('div');
					div.setAttribute('id', `top-${i}-${hintIndexV}`);
					div.setAttribute('class', 'hint-box');
					div.innerHTML = countV;
					document.getElementById(`top-${i}`).appendChild(div);

					tempTop.push(countV);
					countV = 0;
					blackV = false;
					hintIndexV++;
				}
				else if((blackV === false && res[j][i] === 1) || (blackV === true && res[j][i] === 1)){
					countV++;
					blackV = true;
				}
			}
		}

		if(i < res.length) {
			leftArr.push(tempLeft);
			topArr.push(tempTop);
		}
	}

	container.style.width = (leftBoard.offsetWidth + gameBoard.offsetWidth) + padding + 'px';

	let max = 0;
	for(let i = 0; i < topArr.length; i++){
		if(max < topArr[i].length){
			max = topArr[i].length;
		}
	}
	
	topBoard.style.height = (max) * boxSize + 'px';

	container.style.height = (topBoard.offsetHeight + gameBoard.offsetHeight) + padding + 'px';

	let blank = document.getElementById('blank-board');

	blank.style.width = leftBoard.offsetWidth + 'px';
	blank.style.height = topBoard.offsetHeight + 'px';
}

function checkState(id, size){
	/**************/
	/* -Check match vertically & horizontally with hint
	/* -Check Win condition?
	/**************/


	let idArr = id.split('-');
	let col = idArr[2];
	let row = idArr[1];

	// check red
	let blackH = false;
	let countBlack = 0;
	let startWhite = false;
	let setBlack = 0;
	let errorFlag = false;

	// check horizontal
	for(let i = 0; i <= size; i++){
		let box = document.getElementById(`main-${row}-${i}`);

		if(i === size){
			if(errorFlag === false){
				if(document.getElementById(`left-${row}`).style.color === 'red'){
					document.getElementById(`left-${row}`).style.color = 'black';
				}
			}
		}
		else if(i === size - 1){
			if(box.style.backgroundColor === 'black' && startWhite === true){
				if(setBlack === document.getElementById(`left-${row}`).childElementCount){
					document.getElementById(`left-${row}`).style.color = 'red';
					break;
				}
				else{
					countBlack++;

					let leftHint = document.getElementById(`left-${row}-${setBlack}`).innerText;
						
					if(errorFlag === false && countBlack !== parseInt(leftHint)){
						document.getElementById(`left-${row}`).style.color = 'red';
						errorFlag = true;
					}
					else{
						if(document.getElementById(`left-${row}`).style.color === 'red'){
							document.getElementById(`left-${row}`).style.color = 'black';
						}
					}
				}
			}
			else if(box.style.backgroundColor === 'white' && blackH === true){
				if(setBlack === document.getElementById(`left-${row}`).childElementCount){
					document.getElementById(`left-${row}`).style.color = 'red';
					break;
				}
				else{
					let leftHint = document.getElementById(`left-${row}-${setBlack}`).innerText;

					if(errorFlag === true){
						// only for skipping (maybe safe to delete)
					}
					else if(errorFlag === false && countBlack !== parseInt(leftHint)){
						document.getElementById(`left-${row}`).style.color = 'red';
						errorFlag = true;
						break;
					}
					else{
						if(document.getElementById(`left-${row}`).style.color === 'red'){
							document.getElementById(`left-${row}`).style.color = 'black';
						}
					}
				}
			}
		}
		else{
			if(box.style.backgroundColor === 'black' && blackH === false){
				if(i - 1 < 0){
					startWhite = true;
					blackH = true;
					countBlack++;
				}
				else{
					// check left neighbor
					let neighbor = document.getElementById(`main-${row}-${i - 1}`);
					if(neighbor.style.backgroundColor === 'white'){
						startWhite = true;
						blackH = true;
						countBlack++;
					}
				}
			}
			else if(box.style.backgroundColor === 'black' && blackH === true){
				countBlack++;
			}
			else if(box.style.backgroundColor === 'white' && blackH === true){
				if(setBlack === document.getElementById(`left-${row}`).childElementCount){
					document.getElementById(`left-${row}`).style.color = 'red';
					break;
				}
				else{
					let leftHint = document.getElementById(`left-${row}-${setBlack}`).innerText;

					if(errorFlag === true){
						// only for skipping (maybe safe to delete)
					}
					else if(errorFlag === false && countBlack !== parseInt(leftHint)){
						document.getElementById(`left-${row}`).style.color = 'red';
						errorFlag = true;
						break;
					}
					else{
						if(document.getElementById(`left-${row}`).style.color === 'red'){
							document.getElementById(`left-${row}`).style.color = 'black';
						}
					}
				}
				setBlack++;
				countBlack = 0;
				blackH = false;
			}
			else if(blackH === true && box.style.backgroundColor === ''){
				if(errorFlag === false){
					if(document.getElementById(`left-${row}`).style.color === 'red'){
						document.getElementById(`left-${row}`).style.color = 'black';
					}
				}
				countBlack = 0;
				blackH = false;
				startWhite = false;
			}
		}
	}

	// reset
	blackH = false;
	countBlack = 0;
	startWhite = false;
	setBlack = 0;
	errorFlag = false;

	//check vertical
	for(let i = 0; i <= size; i++){
		let box = document.getElementById(`main-${i}-${col}`);
		if(i === size){
			if(errorFlag === false){
				if(document.getElementById(`top-${col}`).style.color === 'red'){
					document.getElementById(`top-${col}`).style.color = 'black';
				}
			}
		}
		else if(i === size - 1){
			if(box.style.backgroundColor === 'black' && startWhite === true){
				if(setBlack === document.getElementById(`top-${col}`).childElementCount){
					document.getElementById(`top-${col}`).style.color = 'red';
					break;
				}
				else{
					countBlack++;

					let topHint = document.getElementById(`top-${col}-${setBlack}`).innerText;

					if(errorFlag === false && countBlack !== parseInt(topHint)){
						document.getElementById(`top-${col}`).style.color = 'red';
						errorFlag = true;
					}
					else{
						if(document.getElementById(`top-${col}`).style.color === 'red'){
							document.getElementById(`top-${col}`).style.color = 'black';
						}
					}
				}
			}
			else if(box.style.backgroundColor === 'white' && blackH === true){
				if(setBlack === document.getElementById(`top-${col}`).childElementCount){
					document.getElementById(`top-${col}`).style.color = 'red';
					break;
				}
				else{
					let topHint = document.getElementById(`top-${col}-${setBlack}`).innerText;

					if(errorFlag === true){
						// only for skipping (maybe safe to delete)
					}
					else if(errorFlag === false && countBlack !== parseInt(topHint)){
						document.getElementById(`top-${col}`).style.color = 'red';
						errorFlag = true;
						break;
					}
					else{
						if(document.getElementById(`top-${col}`).style.color === 'red'){
							document.getElementById(`top-${col}`).style.color = 'black';
						}
					}
				}
			}
		}
		
		else{
			if(box.style.backgroundColor === 'black' && blackH === false){
				if(i - 1 < 0){
					startWhite = true;
					blackH = true;
					countBlack++;
				}
				else{
					// check left neighbor
					let neighbor = document.getElementById(`main-${i - 1}-${col}`);
					if(neighbor.style.backgroundColor === 'white'){
						startWhite = true;
						blackH = true;
						countBlack++;
					}
				}
			}
			else if(box.style.backgroundColor === 'black' && blackH === true){
				countBlack++;
			}
			else if(box.style.backgroundColor === 'white' && blackH === true){
				if(setBlack === document.getElementById(`top-${col}`).childElementCount){
					document.getElementById(`top-${col}`).style.color = 'red';
					break;
				}
				else{
					let topHint = document.getElementById(`top-${col}-${setBlack}`).innerText;

					if(errorFlag === true){
						// only for skipping (maybe safe to delete)
					}
					else if(errorFlag === false && countBlack !== parseInt(topHint)){
						document.getElementById(`top-${col}`).style.color = 'red';
						errorFlag = true;
						break;
					}
					else{
						if(document.getElementById(`top-${col}`).style.color === 'red'){
							document.getElementById(`top-${col}`).style.color = 'black';
						}
					}
				}
				setBlack++;
				countBlack = 0;
				blackH = false;
			}
			else if(blackH === true && box.style.backgroundColor === ''){
				if(errorFlag === false){
					if(document.getElementById(`top-${col}`).style.color === 'red'){
							document.getElementById(`top-${col}`).style.color = 'black';
					}
				}
				countBlack = 0;
				blackH = false;
				startWhite = false;
			}
		}
	}
}

// check win
// if all box backgroundColor not empty string
// if top hint and left hint color not red
function checkWin(size){
	let count = 0;

	for(let i = 0; i < size; i++){
		for(let j = 0; j < size; j++){
			let box = document.getElementById(`main-${i}-${j}`);

			if(box.style.backgroundColor === ''){
				i = size;
				break;
			}

			count++;
		}
	}


	if(count === (size * size)){
		topBoard = document.getElementById('top-board').children;
		leftBoard = document.getElementById('left-board').children;

		let flag = true;
		for(let i = 0; i < topBoard.length; i++){
			if(topBoard[i].style.color === 'red'){
				flag = false;
				break;
			}
		}

		if(flag === true){
			for(let i = 0; i < leftBoard.length; i++){
				if(leftBoard[i].style.color === 'red'){
					flag = false;
					break;
				}
			}
		}

		if(flag === true){
			alert('You Win!');
		}
	}
}

