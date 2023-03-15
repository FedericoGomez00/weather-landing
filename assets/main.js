const API = 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=-31.421877&lon=-64.187962&units=metric&lang=es';

const card_box = null || document.getElementById('card-box');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9e44d9c9admsh727e952373076e5p11b112jsn151bd1e26901',
		'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
	}
};

async function fetchData(urlApi, options) {
    const response = await fetch(urlApi, options);
    const data = response.json();

    return data;
}

(async () => {
    try {
        const weather = await fetchData(API, options);
        const card = `
        ${weather.data.map(day => `
            <section class="day-card">
                <h2 class="day-card__title">${day.datetime}</h6>
                <p class="day-card__desc">${day.weather.description}</p>
                <figure>
                    <img src="../img/${day.weather.code}.png" alt="Imagen de referencia del clima">
                </figure>
                <p class="day-card__temp">${day.temp}°C</p>
            </section>
        `).join('')}
        `;

        card_box.innerHTML = card;
    } catch (error) {
        console.error(`Error al renderizar el clima: ${error}`);
    }
})()