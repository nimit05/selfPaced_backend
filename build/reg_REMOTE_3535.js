$(() => {
	$('.form').find('input, textarea').on('keyup blur focus', function(e) {
		var $this = $(this),
			label = $this.prev('label');

		if (e.type === 'keyup') {
			if ($this.val() === '') {
				label.removeClass('active highlight');
			} else {
				label.addClass('active highlight');
			}
		} else if (e.type === 'blur') {
			if ($this.val() === '') {
				label.removeClass('active highlight');
			} else {
				label.removeClass('highlight');
			}
		} else if (e.type === 'focus') {
			if ($this.val() === '') {
				label.removeClass('highlight');
			} else if ($this.val() !== '') {
				label.addClass('highlight');
			}
		}
	});

	let isActive = true;
	$('.tabc').on('click', function(e) {
		e.preventDefault();

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

	$('#submit_btn')[0].onclick = () => {
		if ($('#pass')[0].value == $('#conPass')[0].value) {
		} else {
			alert('Confirm Password should not be same as Password ');
			$('#conPass').css({
				border: 'red solid',
				'border-width': 'thin'
			});
		}
	};
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

let nomistake = false;
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
		nomistake = true;
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
		nomistake = true;
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
		nomistake = true;
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
	} else {
		$('#below_email').empty();
		$('#email').css({
			border: '1px solid #1eff00'
		});
		nomistake = true;
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
		nomistake = true;
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
		$('#below_number').empty();
		$('#phone_Number').css({
			border: '1px solid #1eff00'
		});
		nomistake = true;
	}
}

function send_reg_data() {
	re_pass_vali();
	phone_vali();
	pass_validation();
	email_vali();
	name_vali();
	username_vali();

	if (nomistake) {
		window.location.href = '/email-verify.html';
	}
}

function Remove_name() {
	$('#below_name').empty();
	$('#name').css({
		border: '1px solid #a0b3b0'
	});
}
function Remove_username() {
	$('#below_username').empty();
	$('#username').css({
		border: '1px solid #a0b3b0'
	});
}
function Remove_email() {
	$('#below_email').empty();
	$('#email').css({
		border: '1px solid #ff5390'
	});
}
function Remove_password() {
	$('#warning').empty();
	$('#pass').css({
		border: '1px solid #a0b3b0'
	});
}
function Remove_number() {
	$('#below_number').empty();
	$('#phone_Number').css({
		border: '1px solid #a0b3b0'
	});
}
function Remove_conPass() {
	$('#below_conPass').empty();
	$('#conPass').css({
		border: '1px solid #a0b3b0'
	});
}
