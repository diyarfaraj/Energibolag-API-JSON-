const endpoint = 'http://api.krisinformation.se/v1/links?format=json';

/*const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
*/
const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))


function findMatches(wordToMatch, cities){
	return cities.filter(place => {
		const regex = new RegExp(wordToMatch, 'gi');
		return place.LinkName.match(regex) || place.Location.match(regex)
	});
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

  
function displayMatches(){
	const matchArray = findMatches(this.value, cities);
	const html = matchArray.map(place => {
		const regex = new RegExp(this.value, 'gi');
		const kommun = place.LinkName.replace(regex, `<span class="h1">${this.value}</span>`);
		const lan = place.Location.replace(regex, `<span class="h1">${this.value}</span>`);

		return `
		<li>
			<span class="name">${kommun}</span>
			<span class="name">${lan}</span>

		</li>
		`;
	}).join('');

	suggestions.innerHTML = html;
}	

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);