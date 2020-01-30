function makeRandom(size = 10){
	let container = document.getElementById('container');
	let res = {};
	for(let i = 0; i <= size; i++){
		// console.log(`i = ${i}`)

		if(!(i - 1 in res)){
			res[i - 1] = {};
		}

		for(let j = 0; j <= size; j++){
			// console.log(`j = ${j}`)

			// if 0, 0 => blank
			// if 0, x => top
			// if x, 0 => left
			if(i === 0){
				if(j !== 0){
					let div = document.createElement('div');
					div.setAttribute('class', 'box-top');
					div.setAttribute('id', `top-${i}`);
					div.innerHTML = 5;
					container.appendChild(div);
				}
				else{
					let div = document.createElement('div');
					div.setAttribute('class', 'box-main');
					div.innerHTML = 3;
					container.appendChild(div);
				}
			}
			else{
				if(j === 0){
					let div = document.createElement('div');
					div.setAttribute('class', 'box-left');
					div.setAttribute('id', `left-${i}`);
					div.innerHTML = 9;
					container.appendChild(div);
				}
				else{
					if(!(j - 1 in res[i - 1])){
						res[i - 1][j - 1] = Math.round(Math.random());
						let div = document.createElement('div');
						div.setAttribute('class', 'box-main');
						div.setAttribute('id', `${i - 1}-${j - 1}`);
						div.innerHTML = res[i - 1][j - 1];
						container.appendChild(div);
					}
				}
			}
		}
	}

	return res;
}






/*
		t 	t 	t 	t 	t
left-1	0	0	0	0	0
left-2	0	0	0	0	0
*/