async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
}

//  *************************  for login and register with enter key ***************
let register = true;
let login = false;
let veri = false;

document.getElementById('login_tab').onclick = () => {
	login = true;
	register = false;
};

document.getElementById('reg_tab').onclick = () => {
	login = false;
	register = true;
};

document.addEventListener('keypress', (e) => {
	if (e.keyCode == 13) {
		if (login === true && register === false) {
			send_log_data();
		}
		if (login === false && register === true) {
			send_reg_data();
		}
		if (login === false && register === false && veri === true) {
			otp_confirm();
		}
	}
});

// *************************************

$(() => {
	let isActive = true;
	$('.tabc').on('click', function(e) {
		e.preventDefault();
		alert(isAcitve);

		$('.tabn').removeClass('active');

		$('.tabp a').parent().addClass('active');

		$(this).parent().siblings().removeClass('active');

		if (isActive) {
			$('.tabn').removeClass('active');
			isActive = false;
		} else {
			isActive = true;
		}
	});

	$('.tab a').on('click', function(e) {
		e.preventDefault();

		$(this).parent().addClass('active');
		$('.tabn a').parent().addClass('active');

		$(this).parent().siblings().removeClass('active');

		if (isActive) {
			$('.tabp').removeClass('active');
			// $('.tabn').removeClass('active');
			isActive = false;
		} else {
			isActive = true;
		}

		target = $(this).attr('href');

		$('.tab-content > div').not(target).hide();

		$(target).fadeIn(500);
	});
	//    isActive = true;
});

function onSuccess(googleUser) {
	console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
	console.log(error);
}
function renderButton() {
	gapi.signin2.render('my-signin2', {
		scope: 'profile email',
		width: 220,
		height: 50,
		longtitle: true,
		theme: 'dark',
		onsuccess: onSuccess,
		onfailure: onFailure
	});
}

let nomistake = true;
function pass_validation() {
	let p1 = $('#pass').val().match(/^.{8,20}$/);
	let p2 = $('#pass').val().match(/^(?=.*[a-z]).{8,20}$/);
	let p3 = $('#pass').val().match(/^(?=.*[0-9]).{8,20}$/);
	let p4 = $('#pass').val().match(/^(?=.*[!@#$%^&*]).{8,20}$/);
	console.log(p1);
	console.log(p4);
	console.log(p3);
	console.log(p2);

	$('#warning').empty();

	if (!p1 || !p2 || !p3 || p4) {
		if (!p1) {
			$('#warning').append($('<li>').text('Password must be of minimum 8 letters and Maxmimum of 20'));

			$('#pass').css({
				border: 'red solid',
				'border-width': 'thin'
			});

			nomistake = false;
		}
		if (!p2) {
			$('#warning').append($('<li>').text('Password must contain at least 1 lowercase alphabetical character'));

			$('#pass').css({
				border: 'red solid',
				'border-width': 'thin'
			});

			nomistake = false;
		}
		if (!p3) {
			$('#warning').append($('<li>').text('Password must contain at least 1 numeric character'));

			$('#pass').css({
				border: 'red solid',
				'border-width': 'thin'
			});

			nomistake = false;
		}
		if (!p4) {
			$('#warning').append($('<li>').text('Password must contain at least one special character.(!@#$%^&*)'));

			$('#pass').css({
				border: 'red solid',
				'border-width': 'thin'
			});

			nomistake = false;
		}
	} else {
		$('#warning').empty();
		$('#pass').css({
			border: '1px solid #1eff00'
		});
	}
}

function re_pass_vali() {
	if ($('#conPass').val().length == 0) {
		$('#below_conPass').append($('<p>')).text('Re-enter your password');
		$('#conPass').css({
			border: 'red solid',
			'border-width': 'thin'
		});
		nomistake = false;
	} else if ($('#pass').val() != $('#conPass').val()) {
		console.log($('#pass').val());
		console.log($('#conPass').val());
		$('#below_conPass').append($('<p>')).text('Password did not match');
		$('#conPass').css({
			border: 'red solid',
			'border-width': 'thin'
		});

		nomistake = false;
	} else {
		$('#below_conPass').empty();
		$('#conPass').css({
			border: '1px solid #1eff00'
		});
	}
}

function name_vali() {
	if ($('#name').val().length == 0) {
		$('#below_name').append($('<p>')).text('Enter your name');
		$('#name').css({
			border: 'red solid',
			'border-width': 'thin'
		});
		nomistake = false;
	} else if ($('#name').val().length < 3) {
		$('#below_name').append($('<p>')).text('Name should be greater than 2 letters');
		$('#name').css({
			border: 'red solid',
			'border-width': 'thin'
		});
		nomistake = false;
	} else {
		$('#below_name').empty();

		$('#name').css({
			border: '1px solid #1eff00'
		});
	}
}

function email_vali() {
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if (!$('#email').val().match(mailformat)) {
		$('#below_email').append($('<p>')).text('Enter correct email id');
		$('#email').css({
			border: 'red solid',
			'border-width': 'thin'
		});
		nomistake = false;
	} else if ($('#email').val().length < 2) {
		$('#below_email').append($('<p>')).text('Enter E-mail id');
		$('#email').css({
			border: 'red solid',
			'border-width': 'thin'
		});
		nomistake = false;
	} else {
		$('#below_email').empty();
		$('#email').css({
			border: '1px solid #1eff00'
		});
	}
}

function username_vali() {
	// todo check username exist with backend

	if ($('#username').val().length == 0) {
		$('#below_username').append($('<p>')).text('Enter your username');
		$('#username').css({
			border: 'red solid',
			'border-width': 'thin'
		});
		nomistake = false;
	} else {
		$('#below_username').empty();
		$('#username').css({
			border: '1px solid #1eff00'
		});
	}
}
function phone_vali() {
	if ($('#phone_Number').val().length == 0) {
		$('#below_number').append($('<p>')).text('Enter your phone number');
		$('#phone_Number').css({
			border: 'red solid',
			'border-width': 'thin'
		});
		nomistake = false;
	} else if ($('#phone_Number').val().length < 10 || $('#phone_Number').val().length > 13) {
		$('#below_number').append($('<p>')).text('Enter a valid phone number');
		$('#phone_Number').css({
			border: 'red solid',
			'border-width': 'thin'
		});

		nomistake = false;
	} else {
		$('#warning').empty();
		$('#pass').css({
			border: '1px solid #a0b3b0'
		});
	}
}
let nologmistake = true;
function log_username_vali() {
	if ($('#log_username').val().length == 0) {
		$('#below_logUser').append($('<p>')).text('Enter your username');
		$('#log_username').css({
			border: 'red solid',
			'border-width': 'thin'
		});
		nologmistake = false;
	} else {
		$('#below_logUser').empty();
		$('#log_username').css({
			border: '1px solid #1eff00'
		});
	}
}
function log_pass_vali() {
	if ($('#wrong_pass').val().length == 0) {
		$('#below_logPass').append($('<p>')).text('Enter your password');
		$('#wrong_pass').css({
			border: 'red solid',
			'border-width': 'thin'
		});
		nologmistake = false;
	} else {
		$('#below_logUser').empty();
		$('#wrong_pass').css({
			border: '1px solid #1eff00'
		});
	}
}

let email = null;
function send_reg_data() {
	nomistake = true;
	re_pass_vali();
	phone_vali();
	pass_validation();
	email_vali();
	name_vali();
	username_vali();
	re_pass_vali();

	if (nomistake) {
		let data = {
			user: {
				name: $('#name').val(),
				username: $('#username').val(),
				email: $('#email').val(),
				password: $('#pass').val(),
				phone_Number: $('#phone_Number').val()
			}
		};

		postData('/api/register', data).then((data) => {
			if (data.email === $('#email').val()) {
				email = data.email;
				make_email();
			} else if (data.error) {
				if (data.error.indexOf('username exist') > -1) {
					$('#below_username').append($('<p>')).text('Username Already Taken');
					$('#username').css({
						border: 'red solid',
						'border-width': 'thin'
					});
					nomistake = false;
				}
				if (data.error.indexOf('email exist') > -1) {
					$('#below_email').append($('<p>')).text('Email id already exist');
					$('#email').css({
						border: 'red solid',
						'border-width': 'thin'
					});
					nomistake = false;
				}
				if (data.error.indexOf('phonenumber exist') > -1) {
					$('#below_number').append($('<p>')).text('Phone Number Already Exist');
					$('#phone_Number').css({
						border: 'red solid',
						'border-width': 'thin'
					});
					nomistake = false;
				}
			}
		});
	}
}
function make_email() {
	veri = true;
	login = false;
	register = false;
	document.getElementById('login_tab').style.display = 'none';
	document.getElementById('email_tab').style.display = 'block';
	$('#reg_tab').removeClass('active');
	$('#email_tab').addClass('active');
	target = '#email_veri';

	$('.tab-content > div').not(target).hide();

	$(target).fadeIn(500);
}

function otp_confirm() {
	let data1 = {
		email: email,
		email_otp: $('#otp').val()
	};

	postData('/api/email-verification/', data1).then((data) => {
		console.log(data);
		if (data.otp) {
			location.replace('/');
		} else {
			alert('otp is invalid , Try Resending');
		}
	});
}

function send_log_data() {
	log_pass_vali();
	log_username_vali();

	let data3 = {
		user: {
			username: $('#log_username').val(),
			password: $('#wrong_pass').val()
		}
	};
	if (nologmistake) {
		postData('/api/login', data3).then((data) => {
			
			 if (data.username) {
				location.replace('/');
			} else if (data.error) {
				$('#below_logUser').append($('<p>')).text('Username Or Password is Incorrect');
				$('#log_username').css({
					border: 'red solid',
					'border-width': 'thin'
				});
				$('#below_passUser').append($('<p>')).text('Enter your username');
				$('#wrong_pass').css({
					border: 'red solid',
					'border-width': 'thin'
				});
				nologmistake = false;
			}
		});
	}
}
