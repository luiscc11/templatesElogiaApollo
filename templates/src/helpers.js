export function quitarEspacio(str){
	var newStr = str.replace(/\s+/g, '%20');
	return newStr;
}

