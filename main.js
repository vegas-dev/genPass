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

class Validation {
	constructor(selector, params = {}) {
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
			noSpecial: false,
		}, params);

		this.run();
	}

	run() {
		let self = this;
		this.el.addEventListener('keyup', function () {
			self.validate();
		});
	}

	validate(){
		if(this.isBadPass()) {
			this.setBadPass();
		}
	}

	isBadPass() {
		let inp = this.el.value,
			errors = [];

		for (const [key, value] of Object.entries(this.defaults)) {
			if (key === 'minLength' && value > inp.length) {
				errors.push({
					'type': 'minLength',
					'text': 'Мало символов'
				})
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

	normalPass() {
		this.box.classList.add('normal');
	}

	goodPass() {
		this.box.classList.add('good');
	}
}

new Validation('#userPassword', {
	minLength: 5,
	noUpper: true
});