// Put your custom code here

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	// alert("Device Ready!");
	navigator.splashscreen.hide();
	
	function alertDismissed() {
		console.log("The alert was dismissed");
		navigator.vibrate(3000);
		navigator.notification.beep(2);
	}

	function myAlert(msg, title, btn) {
		navigator.notification.alert(
			msg,  			// message
			alertDismissed, // callback
			title,          // title
			btn             // buttonName
		);
	}
	$("#btnMyAlert").on("click", function(){ myAlert("Try again", "Game Over", "Dismiss") });

	function takePhoto() {
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
			destinationType: Camera.DestinationType.FILE_URI,
			saveToPhotoAlbum: true
		});
	}
	$("#btnTakePhoto").on("click", function() { takePhoto() });

	function onSuccess(imageData) {
		var image = document.getElementById('myImage'); // Add <img src="" id="myImage"> to HTML
		image.src = imageData;
	}

	function onFail(message) {
		alert('Failed because: ' + message);
	}
}

function getURL(theURL) {
	window.open(theURL, "_blank", "location=yes");
}

function getName() {
	// alert("Clicked on CUSTOMIZED");
	// localStorage   <-- HTML5 "Cookies"
	// localStorage.userName = prompt("What's your name?");
	navigator.notification.prompt(
		'Please enter your name',  // message
		onPrompt,                  // callback to invoke
		'Customize',	           // title
		['Cancel','OK'],           // buttonLabels
		'Jane'		               // defaultText
	);
	// alert(localStorage.userName);
	// $(".nameMsg").html(", " + localStorage.userName + "!");
}

function onPrompt(results) {
	if(results.buttonIndex == 2) {
		localStorage.userName = results.input1;
		$(".nameMsg").html(", " + localStorage.userName + "!");	
	} else {
		$(".nameMsg").html("");	
	}
}

function loadName() {
	if(localStorage.userName == undefined) {
		// No name. Do nothing.
	} else {
		$(".nameMsg").html(", " + localStorage.userName + "!");
	}
}

$("#btnCustomize").on("click", function() { getName() });
 

// document.getElementById("thing")   	<-- JavaScript
// $("#thing")							<-- jQuery