const API = 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=-31.421877&lon=-64.187962&units=metric&lang=es';

const card_box = null || document.getElementById('card-box');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '9e44d9c9admsh727e952373076e5p11b112jsn151bd1e26901',
		'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
	}
};

class DayInfo {
    constructor(date) {
        this.date = new Date(date);
        this.day = date.getDay();
        this.month = date.getMonth();
        this.info = [];
    }

    setInfo(hour, temp, description, code) {
        this.info.push({
            'hour': hour,
            'temp': temp,
            'description': description,
            'code': code
        })
    }
}

const day_number = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",];

async function fetchData(urlApi, options) {
    const response = await fetch(urlApi, options);
    const data = response.json();

    return data;
}

(async () => {
    try {
        const weather = await fetchData(API, options);
        const days = [];

        // Agrupa las horas por día
        for (let day of weather.data) {
            const date_year = day.datetime.slice(0, 4);
            const date_month = day.datetime.slice(5, 7);
            const date_day = day.datetime.slice(8, 10);
            const date_hour = day.datetime.slice(11, 13);
            // console.log(`${date_year} - ${date_month} - ${date_day} :: ${date_hour}`);
            let date = new Date(date_year, date_month, date_day, date_hour, "00");
            console.log(date);

            if (!days.some(d => {
                return date.getDay() == d.day;
            })) {
                days.push(new DayInfo(date));
            }
            days[days.length - 1].setInfo(
                hour = date.getHours(),
                temp = day.temp,
                description = day.weather.description,
                code = day.weather.code
            );

        }

        let hourCards = ``;
        for (let day of days) {
            hourCards = `
                ${day.info.map(hour => `
                    <h3 class="day-card__hour">${hour.hour}</h3>
                    <section class="day-card__info">
                        <p class="day-card__desc">${hour.temp}°C</p>
                        <p class="day-card__temp">${hour.description}</p>
                    </section>
                `).join('')}
            `;
        }
        const box = `
                ${days.map(day => `
                    <section class="day-card">
                        <h2 class="day-card__date">${day_number[day.day]}</h6>
                        
                        ${hourCards}
                    </section>
                `).join('')}
            `;

        card_box.innerHTML = box;
    } catch (error) {
        console.error(`Error al renderizar el clima: ${error}`);
    }
})()