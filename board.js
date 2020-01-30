function generateBoard(size = 10){
	/*********************/
	/* Generate black & board 
	/*********************/
	let boxSize = 32; //2px for border

	let container = document.getElementById('container');
	let gameBoard = document.getElementById('game-board');
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
			div.setAttribute('id', `${i}-${j}`);
			div.innerHTML = num; // comment this
			gameBoard.appendChild(div);
		}

		res.push(temp);
	}

	gameBoard.style.width = (boxSize * size) + 'px';

	console.log(res);
	/*********************/
	/* Count black 
	/*********************/
	let leftArr = [];
	let topArr = [];

	let leftBoard = document.getElementById('left-board');
	let topBoard = document.getElementById('top-board');

	for(let i = 0; i < res.length; i++){
		let tempTop = [];
		let tempLeft = [];
		let blackH = false;
		let blackV = false;
		let countH = 0;
		let countV = 0;

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
					div.setAttribute('id', `left-${i}-${j - 1}`);
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
					div.setAttribute('id', `left-${i}-${j - 1}`);
					div.setAttribute('class', 'hint-box');
					div.innerHTML = countH;
					document.getElementById(`left-${i}`).appendChild(div);

					tempLeft.push(countH);
					countH = 0;
					blackH = false;
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
					div.setAttribute('id', `top-${j-1}-${i}`);
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
					div.setAttribute('id', `top-${j}-${i}`);
					div.setAttribute('class', 'hint-box');
					div.innerHTML = countV;
					document.getElementById(`top-${i}`).appendChild(div);

					tempTop.push(countV);
					countV = 0;
					blackV = false;
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

	container.style.width = (leftBoard.offsetWidth + gameBoard.offsetWidth) + 'px';

	let blank = document.getElementById('blank-board');

	blank.style.width = leftBoard.offsetWidth + 'px';
}