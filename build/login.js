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


$(() => {
	let isActive = true;

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
let nologmistake = false;
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
		nologmistake = true;
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
		nologmistake = true;
	}
}

function log_details(){
	let data = {
		user :{
			username : $('#log_username').val(),
            password : $('#wrong_pass').val()
		}
	}
  
	if(nologmistake){
	postData('/api/login/' , data).then((data) => {
		if(data.username){
			location.replace('/')
		}else if(data.error){
			$('#below_logUser').append($('<p>')).text('Username Or Password is Incorrect');
			$('#log_username').css({
				border: 'red solid',
				'border-width': 'thin'
			});
		}
	})
}
   nologmistake = false;

}

