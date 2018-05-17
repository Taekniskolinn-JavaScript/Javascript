"use strict";

let tonleikar = document.createElement('span')
tonleikar.setAttribute('id', 'concerts')

let tonleikar_allir = [];
let sortByName;
let sortByPlace;

$.getJSON('https://apis.is/concerts', function(data) {
	moment.locale('is'); 
	for (let i = 0; i < data['results'].length; i++){ 
    	tonleikar_allir.push({eventName: data['results'][i]['eventDateName'], locationName: data['results'][i]['eventHallName'], dateTime: moment(data['results'][i]['dateOfShow']).format('LT'), img: data['results'][i]['imageSource'], dateShow: moment(data['results'][i]['dateOfShow']).format('DoMMMM YYYY')});
	}

	function createElements(){ 
		for (let x = 0; x < data['results'].length; x++){

			let brr = document.createElement('br');
			let tono = document.createElement('div');
			tono.setAttribute('class', 'concert');
			tono.setAttribute('id', tonleikar_allir[x]['eventName']);

			let mynd = document.createElement('img');
			mynd.setAttribute('src', tonleikar_allir[x]['img']);
			tono.appendChild(mynd);
			tono.appendChild(brr);

			let uppl = document.createElement('div');
			uppl.setAttribute('class', 'upplysinga_div');
			tono.appendChild(uppl);

			let upplyingar_nafn = document.createElement('div');
			let Nafn_Sterkt = document.createElement('strong');
			let upplyingar_nafnText = document.createTextNode('Nafn:');
			Nafn_Sterkt.appendChild(upplyingar_nafnText);
			if (tonleikar_allir[x]['eventName'].length > 25){
				tonleikar_allir[x]['eventName'] = tonleikar_allir[x]['eventName'].substring(0, 25) + '...';
			}
			let event = document.createTextNode(' ' + tonleikar_allir[x]['eventName']);
			upplyingar_nafn.appendChild(Nafn_Sterkt);
			upplyingar_nafn.appendChild(event);
			uppl.appendChild(upplyingar_nafn);

			let location = document.createElement('div');
			let sterkt = document.createElement('strong');
			let stadsetning = document.createTextNode('Staðsetning:');
			sterkt.appendChild(stadsetning);
			if (tonleikar_allir[x]['locationName'].length > 25){
				tonleikar_allir[x]['locationName'] = tonleikar_allir[x]['locationName'].substring(0, 25) + '...';
			}
			let loaction = document.createTextNode(' ' + tonleikar_allir[x]['locationName']);
			location.appendChild(sterkt);
			location.appendChild(loaction);
			uppl.appendChild(location);

			

			let upplysingar_timi = document.createElement('div');
			let sterkur_Timi = document.createElement('strong');
			let upplysingar_timiText = document.createTextNode('Klukkan:');
			sterkur_Timi.appendChild(upplysingar_timiText);
			let time = document.createTextNode(' ' + tonleikar_allir[x]['dateTime']);
			upplysingar_timi.appendChild(sterkur_Timi);
			upplysingar_timi.appendChild(time);
			uppl.appendChild(upplysingar_timi);

			let upplyingar_dags = document.createElement('div');
			let sterkt_Dagsetning = document.createElement('strong');
			let upplyingar_dagsText = document.createTextNode('Dagsetning:');
			sterkt_Dagsetning.appendChild(upplyingar_dagsText);
			let date = document.createTextNode(' ' + tonleikar_allir[x]['dateShow']);
			upplyingar_dags.appendChild(sterkt_Dagsetning);
			upplyingar_dags.appendChild(date);
			uppl.appendChild(upplyingar_dags);


			tonleikar.appendChild(tono)

			document.body.appendChild(tonleikar);

		}
	}

	function leitaFunction() { 
		var velja_alla_tonleika = document.querySelectorAll('#concerts .concert');    
		var leita = document.querySelector('#filter-leita');
		var listinn = [];

		velja_alla_tonleika.forEach(function(single_concert) {
			listinn.push({
			  element: single_concert,
			  text: single_concert.id.trim().toLowerCase()
			});
		});

		function filter() {
		var the_query = this.value.trim().toLowerCase();
			listinn.forEach(function(concertText) {
			  var index = 0;

			  if (the_query) {
			    index = concertText.text.indexOf(the_query);
			  }

			  concertText.element.style.display = index === -1 ? 'none' : '';
			});
		}

		if ('oninput' in leita) {
			leita.addEventListener('input', filter);
		} 
		else {
			leita.addEventListener('keyup', filter);
		}
	}

	createElements();
	leitaFunction();

	sortByName = function sortedConcertsName(){ 
		var tonleikarnir = document.getElementById('concerts');
		while (tonleikarnir.firstChild){
			tonleikarnir.removeChild(tonleikarnir.firstChild);
		}
		tonleikar_allir.sort(function(a, b) {
		    var A = a.eventName.toUpperCase();
		    var B = b.eventName.toUpperCase();
		    return (A < B) ? -1 : (A > B) ? 1 : 0;
		});
		createElements();
		leitaFunction();
	}

	sortByPlace = function sortedConcertsPlace(){ 
		var tonleikarnir = document.getElementById('concerts');
		while (tonleikarnir.firstChild){
			tonleikarnir.removeChild(tonleikarnir.firstChild);
		}
		tonleikar_allir.sort(function(a, b) {
		    var A = a.locationName.toUpperCase();
		    var B = b.locationName.toUpperCase();
		    return (A < B) ? -1 : (A > B) ? 1 : 0;
		});
		createElements();
		leitaFunction();
	}

});