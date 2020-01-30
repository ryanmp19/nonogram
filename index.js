function makeRandom(size = 10){
	let res = {};
	for(let i = 0; i < size; i++){
		if(!(i in res)){
			res[i] = {};
		}

		for(let j = 0; j < size; j++){
			if(!(j in res[i])){
				res[i][j] = Math.round(Math.random());
			}
		}
	}

	return res;
}

console.log(makeRandom());