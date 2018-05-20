if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('service-worker.js').then(function(registration) {
			// Registration was successful.
			console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function(err) {
			// registration failed.
			console.log('ServiceWorker registration failed: ', err);
		}).catch(function(err) {
			console.log(err);
		});
	});
} else {
	console.log('service worker is not supported');
}

/*if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./service-worker.js', { scope: './' })
	.then(function(registration) {
		console.log("Service Worker Registered");
	})
	.catch(function(err) {
		console.log("Service Worker Failed to Register", err);
	})
}

// Function to perform HTTP request
let get = function(url) {
	return new Promise(function(resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					let result = xhr.responseText
					result = JSON.parse(result);
					resolve(result);
				}
				else {
					reject(xhr);
				}
			}
		};

		xhr.open("GET", url, true);
		xhr.send();
	}); 
};

get('https://api.nasa.gov/planetary/earth/imagery?api_key=fWfSMcDzyHfMuH3BW6jiIUBYaj3hKRyKBRTBqgEQ')
	.then(function(response) {
		// There is an issue with the image being pulled from the API, so using a different one instead
		document.getElementsByClassName('targetImage')[0].src = "https://api.nasa.gov/images/earth.png";
	})
	.catch(function(err) {
		console.log("Error", err);
	})
	
	*/