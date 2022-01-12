let colorBlock = document.querySelector('.color-block'),
	textBlock = document.querySelector('.text-block'),
	pass = document.querySelector('#userPassword'),
	repPass = document.querySelector('#repeatPassword'),
	btn = document.querySelector('#createPassword');

	pass.addEventListener('keyup', function () {
		let passValue = pass.value;
		let uppercase = /[A-Z]/g;
		let num = /[0-9]/g;

		if ( passValue.length >= 1 && passValue.length <= 5) {
			colorBlock.classList.add('bad');
		} else {
			colorBlock.classList.remove('bad');
		}

		if ( passValue.length >= 6 && passValue.length <= 10) {
			colorBlock.classList.add('bad');

			if (passValue.match(uppercase)) {
				colorBlock.classList.add('normal');
				colorBlock.classList.remove('bad');
			} else {
				colorBlock.classList.add('bad');
				colorBlock.classList.remove('normal');
			}

		} else {
			colorBlock.classList.remove('normal');
		}

		if ( passValue.length >= 11 && passValue.match(uppercase)) {
			colorBlock.classList.add('normal');

		} else {
			colorBlock.classList.add('bad');
		}

		if ( passValue.length >= 11 && passValue.match(uppercase) && passValue.match(num)) {
			colorBlock.classList.add('good');

		} else {
			colorBlock.classList.add('bad');
			colorBlock.classList.remove('good');
		}
	});

btn.addEventListener('click', () => {
	if (pass.value !== repPass.value) {
		textBlock.classList.add('active');
		textBlock.innerText = 'Пароли не совпадают';
	} else  {
		return true;
	}

});

class GenPass {

	constructor() {
		this.num = false;
		this.str = false;
		this.smb = false;
	}

	variables() {
		let colorBlock = document.querySelector('.color-block'),
			textBlock = document.querySelector('.text-block'),
			pass = document.querySelector('#userPassword'),
			repPass = document.querySelector('#repeatPassword'),
			btn = document.querySelector('#createPassword');
	}

}

// Использование:
let num = /[0-9]/g ;
let user = new GenPass(num);
user.sayHi();

