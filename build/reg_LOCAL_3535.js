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
	$('.tabc').on('click' , function(e) {
		e.preventDefault();

		
			$('.tabn').removeClass('active');
        
		$('.tabp a').parent().addClass('active');


		$(this).parent().siblings().removeClass('active');

		if(isActive){
			$('.tabn').removeClass('active');
			isActive = false;
		}else{
			isActive = true;

		}
	})

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
				'border' : 'red solid' ,
				'border-width': 'thin'
			})
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

var isthere = true
function Validation(){
var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

	if( !$('#wrong_pass').val().match(decimal) ){
		if(isthere){
		$('#warning').append($('<p>').text('Password must be of minimum 8 letters and contains a small letter a Capital letter , a special character and numeric digit'))
		isthere = false
		}
	}
	else{
		if(!isthere){
		$('#warning').empty()
		isthere = true
		}
	}
}


function Pass_Validation(){
	var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	if($('#name').val().length == 0){
		$('#below_name').append($('<p>')).text('Enter your name')
		$('#name').css({
			'border' : 'red solid' ,
			'border-width': 'thin'
		})
		isthere = false

	}else{
		$('#below_name').empty()
	
		$('#name').css({
  'border': '1px solid #a0b3b0'
			
		})
		isthere = true

	}
	if(!$('#email').val().match(mailformat) ){
		$('#below_email').append($('<p>')).text('Enter correct email id')
		$('#email').css({
			'border' : 'red solid' ,
			'border-width': 'thin'
		})
		isthere = false

	}else{
		$('#below_email').empty()
		$('#email').css({
			'border': '1px solid #a0b3b0'
					  
				  })
		isthere = true

	}
	if($('#username').val().length == 0){
		$('#below_username').append($('<p>')).text('Enter your username')
		$('#username').css({
			'border' : 'red solid' ,
			'border-width': 'thin'
		})
		isthere = false

	}else{
		$('#below_username').empty()
		$('#username').css({
			'border': '1px solid #a0b3b0'
					  
				  })
		isthere = true

	}
	if($('#phone_Number').val().length == 0 ){
		$('#below_number').append($('<p>')).text('Enter your phone number')
		$('#phone_Number').css({
			'border' : 'red solid' ,
			'border-width': 'thin'
		})
		isthere = false

	}else{
		$('#below_number').empty()
		$('#phone_Number').css({
			'border': '1px solid #a0b3b0'
					  
				  })
		isthere = true

	}
	if($('#conPass').val().length == 0 ){
		$('#below_conPass').append($('<p>')).text('Re-enter your password')
		$('#conPass').css({
			'border' : 'red solid' ,
			'border-width': 'thin'
		})
		isthere = false

	}else{
		$('#below_conPass').empty()
		$('#conPass').css({
			'border': '1px solid #a0b3b0'
					  
				  })
		isthere = true

	}


	if( !$('#pass').val().match(decimal) ){
		
		$('#warning').append($('<p>').text('Password must be of minimum 8 letters and contains a small letter a Capital letter , a special character and numeric digit'))
		$('#pass').css({
			'border' : 'red solid' ,
			'border-width': 'thin'
		})
	
		isthere = false
		
	}
	else{

		$('#warning').empty()
		$('#pass').css({
			'border': '1px solid #a0b3b0'
					  
				  })
		isthere = true
		
	}
	if($('#pass').val() != $('#conPass').val() || !$('#pass').val().match(decimal)  ){
		if(isthere){
		$('#below_conPass').append($('<p>')).text('Password did not match')
		$('#conPass').css({
			'border' : 'red solid' ,
			'border-width': 'thin'
		})

		isthere = false
	}
	}else{
		if(!isthere){
		$('#below_conPass').empty()
		$('#conPass').css({
			'border': '1px solid #a0b3b0'
					  
				  })
		isthere = true
				}
	}

	
}

function Linker(){
	if(isthere){
	window.location.href = "/email-verify.html";
	}
}

function Remove_name(){

	$('#below_name').empty()
	$('#name').css({
		'border': '1px solid #a0b3b0'
				  
			  })
	
}
function Remove_username(){

	$('#below_username').empty()
	$('#username').css({
		'border': '1px solid #a0b3b0'
				  
			  })
	
}
function Remove_email(){

	$('#below_email').empty()
	$('#email').css({
		'border': '1px solid #a0b3b0'
				  
			  })
	
}
function Remove_password(){

	$('#warning').empty()
	$('#pass').css({
		'border': '1px solid #a0b3b0'
				  
			  })
	
}
function Remove_number(){

	$('#below_number').empty()
	$('#phone_Number').css({
		'border': '1px solid #a0b3b0'
				  
			  })
	
}
function Remove_conPass(){

	$('#below_conPass').empty()
	$('#conPass').css({
		'border': '1px solid #a0b3b0'
				  
			  })
	
}







