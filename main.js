// let colorBlock = document.querySelector('.color-block'),
// 	textBlock = document.querySelector('.text-block'),
// 	pass = document.querySelector('#userPassword'),
// 	repPass = document.querySelector('#repeatPassword'),
// 	btn = document.querySelector('#createPassword');
//
// 	pass.addEventListener('keyup', function () {
// 		let passValue = pass.value;
// 		let uppercase = /[A-Z]/g;
// 		let num = /[0-9]/g;
//
// 		if ( passValue.length >= 1 && passValue.length <= 5) {
// 			colorBlock.classList.add('bad');
// 		} else {
// 			colorBlock.classList.remove('bad');
// 		}
//
// 		if ( passValue.length >= 6 && passValue.length <= 10) {
// 			colorBlock.classList.add('bad');
//
// 			if (passValue.match(uppercase)) {
// 				colorBlock.classList.add('normal');
// 				colorBlock.classList.remove('bad');
// 			} else {
// 				colorBlock.classList.add('bad');
// 				colorBlock.classList.remove('normal');
// 			}
//
// 		} else {
// 			colorBlock.classList.remove('normal');
// 		}
//
// 		if ( passValue.length >= 11 && passValue.match(uppercase)) {
// 			colorBlock.classList.add('normal');
//
// 		} else {
// 			colorBlock.classList.add('bad');
// 		}
//
// 		if ( passValue.length >= 11 && passValue.match(uppercase) && passValue.match(num)) {
// 			colorBlock.classList.add('good');
//
// 		} else {
// 			colorBlock.classList.add('bad');
// 			colorBlock.classList.remove('good');
// 		}
// 	});
//
// btn.addEventListener('click', () => {
// 	if (pass.value !== repPass.value) {
// 		textBlock.classList.add('active');
// 		textBlock.innerText = 'Пароли не совпадают';
// 	} else  {
// 		return true;
// 	}
//
// });

/*class Validation {
	constructor(selector) {
		this.el = document.querySelector(selector);
		this.box = document.querySelector('.color-block');

		this.charsets = {
			upperCaseSet: /[A-Z]/g,
			lowerCaseSet: /[a-z]/g,
			digitSet: /[0-9]/g,
		};

		this.defaults = Object.assign({
			minLength: 6,
			minUpperCase: 1,
			minLowerCase: 2,
			minDigits: 1,
			noUpper: false,
			noLower: false,
			noDigit: false,
			noSpecial: false
		}, params);

		this.blockColor = ['bad', 'normal', 'good'];

		this.difficulty = [
			{
				noLower: false,
				minLength: 3,
				color: 'bad'
			},
			{
				noUpper: false,
				noLower: false,
				minLength: 6,
				minUpperCase: 1,
				noDigit: false,
			},
			{
				minLength: 6,
				minUpperCase: 1,
				minLowerCase: 2,
				minDigits: 1,
				noUpper: false,
				noLower: false,
				noDigit: false,
				noSpecial: false,
				difficulty: 3
			}
		];

		this.run();
	}

	run() {
		let self = this;
		this.el.addEventListener('keyup', function () {
			self.validate();
		});
	}

	validate(difficulty = 2){


		if(this.isBadPass()) {
			this.setBadPass();
		}

		if (this.isNormalPass()) {
			this.setNormalPass()
		} else {
			this.noColorPass();
		}
	}

	isBadPass() {
		let inp = this.el.value,
			upLetterLength = inp.match(this.charsets.upperCaseSet) ? inp.match(this.charsets.upperCaseSet).length : 0,
			lowLetterLength = inp.match(this.charsets.lowerCaseSet) ? inp.match(this.charsets.lowerCaseSet).length : 0,
			digitSetLength = inp.match(this.charsets.digitSet) ? inp.match(this.charsets.digitSet).length : 0,
			errors = [];


		for (const [key, value] of Object.entries(this.defaults)) {
			if (key === 'minLength' && value >= inp.length) {
				errors.push({
					'type': 'minLength',
					'text': 'Недостаточно символов'
				});
			}

			if (key ==='minUpperCase' && upLetterLength < value) {
				errors.push({
					'type': 'minUpperCase',
					'text': 'Недостаточно символов верхнего регистра'
				});

				if (upLetterLength === value) {
					this.defaults.noUpper = true;
				}
			}

			if (key ==='minLowerCase' && lowLetterLength < value) {
				errors.push({
					'type': 'minLowerCase',
					'text': 'Недостаточно символов нижнего регистра',
				});

				if (lowLetterLength === value) {
					this.defaults.noLower = true;
				}
			}

			if (key ==='minDigits' && digitSetLength < value) {
				errors.push({
					'type': 'minDigits',
					'text': 'Недостаточно чисел',
				});

				if (digitSetLength === value) {
					this.defaults.noDigit = true;
				}
			}

			if (inp === '') {
				return false
			}
		}

		if (errors.length) {
			console.log(errors);
			return true;
		}
	}

	setBadPass() {
		this.box.classList.add('bad');
	}

	isNormalPass() {
		if (this.defaults.noUpper !== true && this.defaults.noLower !== true) {
			return true
		}
	}

	setNormalPass() {
		this.box.classList.add('normal');
	}

	goodPass() {
		this.box.classList.add('good');
	}

	noColorPass() {
		for (let item of this.blockColor) {
			this.box.classList.remove(item);
		}
	}
}

console.log(new Validation('#userPassword')).validate('light');*/

class VGPasswords {
	constructor() {
		this.charsets = {
			upperCaseSet: /[A-Z]/g,
			lowerCaseSet: /[a-z]/g,
			digitSet: /[0-9]/g,
		};

		this.difficulty = {
			light: {
				minLength: 3,
				minLowerCase: 2,
			},

			normal: {
				minLength: 6,
				minUpperCase: 1,
				minLowerCase: 2,
			},

			hard: {
				minLength: 10,
				minDigits: 1,
				minUpperCase: 1,
				minLowerCase: 2,
			}
		}
	}

	validate(value, difficulty = 'light', params = {}) {
		let _difficulty = Object.assign(this.difficulty[difficulty], params),
			colorBlock = document.querySelector('.color-block'),
			textBlock = document.querySelector('.text-block'),
			valueLength = value.length,
			upCaseLength = value.match(this.charsets.upperCaseSet) ? value.match(this.charsets.upperCaseSet).length : 0,
			lowCaseLength = value.match(this.charsets.lowerCaseSet) ? value.match(this.charsets.lowerCaseSet).length : 0,
			digitLength = value.match(this.charsets.digitSet) ? value.match(this.charsets.digitSet).length : 0,
			errors = [];

		function checkDifficultyPass() {
			if (valueLength < _difficulty.minLength) {
				errors.push({
					'type': 'minLength',
					'text': 'Недостаточно символов'
				});
			}
			if (lowCaseLength <= _difficulty.minLowerCase) {
				errors.push({
					'type': 'minLowerCase',
					'text': 'Недостаточно букв нижнего регистра'
				});
			}
			if (upCaseLength < _difficulty.minUpperCase && _difficulty.minLowerCase !== 0) {
				errors.push({
					'type': 'minUpperCase',
					'text': 'Недостаточно букв верхнего регистра'
				});
			}
			if (digitLength <= _difficulty.minDigits) {
				errors.push({
					'type': 'minDigits',
					'text': 'Недостаточно чисел'
				})
			}
		}

		function ShowHideText() {
			if (errors.length !== 0) {
				textBlock.classList.add('active');

				for (let i = 0; i < errors.length; i++) {
					textBlock.innerHTML = errors[i].text;
				}
			}

			if (errors.length === 0 || value === '') {
				textBlock.classList.remove('active');
			}
		}

		function SelectsColorBlock() {

			if (valueLength !== 0) {
				switch (difficulty) {
					case "light":
						if (valueLength < _difficulty.minLength && lowCaseLength < _difficulty.minLowerCase) {
							colorBlock.classList.add('bad')
						} else {
							colorBlock.classList.remove('bad')
						}
						if (valueLength >= _difficulty.minLength && lowCaseLength >= _difficulty.minLowerCase) {
							colorBlock.classList.remove('bad');
							colorBlock.classList.add('normal');
						} else {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('bad');
						}
						if ((upCaseLength || digitLength) && (errors.length === 0) && (valueLength >= (_difficulty.minLength + 2) && lowCaseLength >= (_difficulty.minLowerCase + 2))) {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('good');
						} else {
							colorBlock.classList.remove('good');
						}
						break;

					case "normal":
						if (valueLength < _difficulty.minLength && lowCaseLength < _difficulty.minLowerCase && upCaseLength < _difficulty.minUpperCase) {
							colorBlock.classList.add('bad')
						} else {
							colorBlock.classList.remove('bad')
						}
						if (valueLength >= _difficulty.minLength && lowCaseLength >= _difficulty.minLowerCase && upCaseLength >= _difficulty.minUpperCase) {
							colorBlock.classList.remove('bad');
							colorBlock.classList.add('normal');
						} else {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('bad');
						}
						if ((digitLength) && (errors.length === 0) && (valueLength >= (_difficulty.minLength + 3) && lowCaseLength >= (_difficulty.minLowerCase + 3) && upCaseLength >= (_difficulty.minUpperCase + 1))) {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('good');
						} else {
							colorBlock.classList.remove('good');
						}

						break;

					case "hard":
						if (valueLength < _difficulty.minLength && lowCaseLength < _difficulty.minLowerCase && upCaseLength < _difficulty.minUpperCase && digitLength < _difficulty.minDigits) {
							colorBlock.classList.add('bad')
						} else {
							colorBlock.classList.remove('bad')
						}
						if (valueLength >= _difficulty.minLength && lowCaseLength >= _difficulty.minLowerCase && upCaseLength >= _difficulty.minUpperCase) {
							colorBlock.classList.remove('bad');
							colorBlock.classList.add('normal');
						} else {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('bad');
						}
						if ((errors.length === 0) && (valueLength >= (_difficulty.minLength + 4) && lowCaseLength >= (_difficulty.minLowerCase + 4) && upCaseLength >= (_difficulty.minUpperCase + 2) && digitLength >= (_difficulty.minDigits))) {
							colorBlock.classList.remove('normal');
							colorBlock.classList.add('good');
						} else {
							colorBlock.classList.remove('good');
						}
						break;
				}
			} else {
				colorBlock.classList.remove('bad', 'normal', 'good');
			}
		}

		function difficultyPass() {
			if (!difficulty) return false;
			checkDifficultyPass();
			ShowHideText();
			SelectsColorBlock();
		}

		function checkPassword() {
			document.getElementById('createPassword').addEventListener('click', () => {
				let repeatPass = document.getElementById('repeatPassword').value,
					textBlock = document.querySelector('.text-block');

				if ( value.value === repeatPass && repeatPass !== 0 && errors.length === 0) {
					console.log('hallo')
				} else {
					textBlock.classList.add('active');
					textBlock.innerText = 'Требования к паролю не выполнено';
				}

			});
		}
		checkPassword();
		difficultyPass();

	}

	generate() {

		function generatorPass() {
			let num = document.getElementById('check-numbers').checked,
				upCase = document.getElementById('check-upCase').checked,
				lowCase = document.getElementById('check-lowCase').checked,
				inputLength = +document.querySelector('.input-length').value,
				result = document.querySelector('.result');

			if (num + upCase + lowCase <= 0) return false;

			function generator(min = 0, max = 0) {
				return Math.floor(Math.random() * (max + 1 - min) + min)
			}

			function generateRandomLowerCase() {
				return String.fromCharCode(generator(97, 122));
			}

			function generateRandomUpCase() {
				return String.fromCharCode(generator(65, 90));
			}

			function importantRandom() {
				let randomValue = [];
				for (let i = 0; i < inputLength / inputLength; i++) {
					if (lowCase) {
						randomValue.push(generateRandomLowerCase());
					}
					if (upCase) {
						randomValue.push(generateRandomUpCase());
					}
					if (num) {
						randomValue.push(generator(0, 9));
					}
				}
				return randomValue;
			}

			function noImportantRandom(importantPassLength) {
				let randomValue = [];
				for (let i = 0; i < inputLength - importantPassLength; i++) {
					let r = generator(0, 2);
					if (lowCase && r === 0) {
						randomValue.push(generateRandomLowerCase());
					} else if (upCase && r === 1) {
						randomValue.push(generateRandomUpCase());
					} else if (num && r === 2) {
						randomValue.push(generator(0, 9));
					} else {
						i--;
					}
				}
				return randomValue;
			}

			function shuffle(array) {
				let currentIndex = array.length, temporaryValue, randomIndex;

				while (0 !== currentIndex) {

					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;

					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}

				return array;
			}

			let sImportantRandom = importantRandom();
			let sNoImportantRandom = noImportantRandom(sImportantRandom.length);
			result.textContent = shuffle(sImportantRandom.concat(sNoImportantRandom)).join('');

		}

		document.getElementById('generatePassword').addEventListener('click', function () {
			generatorPass();
		});
	}
}


document.getElementById('userPassword').addEventListener('keyup', function (e) {
	let val = e.target.value,
		difficulty = e.target.dataset.difficulty || 'normal';

	new VGPasswords().validate(val, difficulty, {
		minLength: 5
	});
});

new VGPasswords().generate();


