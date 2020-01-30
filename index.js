function generateBox(size = 10){
	/*********************/
	/* Generate black & board 
	/*********************/
	let countDivH = 0;
	let countDivV = 0;
	let container = document.getElementById('container');
	let res = [];
	for(let i = 0; i <= size; i++){
		// console.log(`i = ${i}`)

		let temp = [];
		for(let j = 0; j <= size; j++){
			// console.log(`j = ${j}`)

			// if 0, 0 => blank
			// if 0, x => top
			// if x, 0 => left
			if(i === 0){
				if(j !== 0){
					let div = document.createElement('div');
					div.setAttribute('class', 'box-top');
					div.setAttribute('id', `top-${j - 1}`);
					// div.innerHTML = 5; // comment this
					container.appendChild(div);
				}
				else{
					let div = document.createElement('div');
					div.setAttribute('class', 'box-main');
					// div.innerHTML = 3; // comment this
					container.appendChild(div);
				}
			}
			else{
				if(j === 0){
					let div = document.createElement('div');
					div.setAttribute('class', 'box-left');
					div.setAttribute('id', `left-${i - 1}`);
					// div.innerHTML = 9; // comment this
					container.appendChild(div);
				}
				else{
					let num = Math.round(Math.random());
					temp.push(num)
					let div = document.createElement('div');
					div.setAttribute('class', 'box-main');
					div.setAttribute('id', `${i - 1}-${j - 1}`);
					div.innerHTML = num; // comment this
					container.appendChild(div);
				}
			}
		}

		if(i !== 0) res.push(temp);
	}

	/*********************/
	/* Count black 
	/*********************/
	// let leftArr = [];
	// let topArr = [];

	// for(let i = 0; i < res.length; i++){
	// 	let tempTop = [];
	// 	let tempLeft = [];
	// 	let blackH = false;
	// 	let blackV = false;
	// 	let countH = 0;
	// 	let countV = 0;

	// 	for(let j = 0; j <= res.length; j++){
	// 		if(j === res.length){
	// 			if(res[i][j-1] === 1){
	// 				let div = document.createElement('div');
	// 				div.setAttribute('id', `left-${i}-${j - 1}`);
	// 				div.setAttribute('class', 'box');
	// 				div.innerHTML = countH;
	// 				document.getElementById(`left-${i}`).appendChild(div);

	// 				tempLeft.push(countH);
	// 				countH = 0;
	// 				blackH = false;
	// 			}
	// 		}
	// 		else{
	// 			if((j === res.length && blackH === true) || (blackH === true && res[i][j] === 0)){
	// 				let div = document.createElement('div');
	// 				div.setAttribute('id', `left-${i}-${j}`);
	// 				div.setAttribute('class', 'box');
	// 				div.innerHTML = countH;
	// 				document.getElementById(`left-${i}`).appendChild(div);

	// 				tempLeft.push(countH);
	// 				countH = 0;
	// 				blackH = false;
	// 			}
	// 			else if((blackH === false && res[i][j] === 1) || (blackH === true && res[i][j] === 1)){
	// 				countH++;
	// 				blackH = true;
	// 			}
	// 		}

	// 		if(j === res.length){
	// 			if(res[j-1][i] === 1){
	// 				let div = document.createElement('div');
	// 				div.setAttribute('id', `top-${j-1}-${i}`);
	// 				div.setAttribute('class', 'box');
	// 				div.innerHTML = countV;
	// 				document.getElementById(`top-${j-1}`).appendChild(div);

	// 				tempTop.push(countV);
	// 				countV = 0;
	// 				blackV = false;
	// 			}
	// 		}
	// 		else{
	// 			if(blackV === true && res[j][i] === 0){
	// 				let div = document.createElement('div');
	// 				div.setAttribute('id', `top-${j}-${i}`);
	// 				div.setAttribute('class', 'box');
	// 				div.innerHTML = countV;
	// 				document.getElementById(`top-${j}`).appendChild(div);

	// 				tempTop.push(countV);
	// 				countV = 0;
	// 				blackV = false;
	// 			}
	// 			else if((blackV === false && res[j][i] === 1) || (blackV === true && res[j][i] === 1)){
	// 				countV++;
	// 				blackV = true;
	// 			}
	// 		}
	// 	}

	// 	if(i < res.length) {
	// 		leftArr.push(tempLeft);
	// 		topArr.push(tempTop);
	// 	}
	// }
	
	/***************************/
	/* Count left & top element 
	/***************************/

	// let boxSize = 32;
	// let max = 0;
	// for(let i = 0; i < leftArr.length; i++){
	// 	if(max < leftArr[i].length){
	// 		max = leftArr[i].length;
	// 	}
	// }

	// document.getElementById('container').style.width = ((max + 1) * boxSize) + ((size + 1) * boxSize) + 'px';

	// let boxLeft = document.getElementsByClassName('box-left');
	// for(let i = 0; i < boxTop.length; i++){
	// 	boxLeft[i].style.width = (max + 1) * boxSize + 'px';
	// }

	// max = 0; //reset max for top (refactor to new function!!)
	// for(let i = 0; i < topArr.length; i++){
	// 	if(max < topArr[i].length){
	// 		max = topArr[i].length;
	// 	}
	// }

	// let boxTop = document.getElementsByClassName('box-top');
	// for(let i = 0; i < boxTop.length; i++){
	// 	boxTop[i].style.height = (max + 1) * boxSize + 'px';
	// }
}



/*
		t 	t 	t 	t 	t
left-1	0	0	0	0	0
left-2	0	0	0	0	0
*/