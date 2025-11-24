console.log("Hola API clima");

async function fetchWeatherData(latitude, longitude) { // async la convierte en asíncrona
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(url); //await le indica a la función que se espere a que termine de ejecutarse para continuar con el proceso.
    console.log(response); 
    const data = await response.json();
    console.log(data);
    console.log(data.elevation);
    console.log(data.current_weather);
    console.log(data.current_weather.temperature);
    return data.current_weather;
}

// fetchWeatherData(25.666815, -100.28233);
async function handleFetchClick(){ // le da funcionalidad al botón
    console.log("Fetch button clicked");
    const latitude = document.getElementById("latitude-input").value; // se accede a la api dom mediante document, usando el metodo getElementByID, se añade value para leer el valor.
    const longitude = document.getElementById("longitude-input").value;
    const currentTemparature = document.getElementById("temp-display");
    const currentWind = document.getElementById("wind-display");

    const currentWeather = await fetchWeatherData(latitude, longitude);
    currentTemparature.textContent = currentWeather.temperature; //referencia a lo que se encuentra entre los tags del html
    currentWind.textContent = currentWeather.windspeed;
}