console.log("Hola API clima");

// Usando GeoCoding API para obtener las coordenadas de la Ciudad
async function getCoordinates(cityName) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=10&language=en&format=json`;
    const geoResponse = await fetch(geoUrl);
    const geodata = await geoResponse.json();
    
    if (!geodata.results || geodata.results.length === 0) {
        throw new Error("City not found, try again.");
    }

    const firstCity = geodata.results[0]; // Elige el primer resultado que coincida con el input
    return firstCity;

}

async function fetchWeatherData(latitude, longitude) { // async la convierte en asíncrona
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(url); //await le indica a la función que se espere a que termine de ejecutarse para continuar con el proceso.
    console.log(response); 
    const data = await response.json();
    console.log(data);
    console.log(data.elevation);
    console.log(data.current_weather);
    console.log(data.current_weather.temperature);
    return data.current_weather; // Devuelve objeto de la API, no se asignan keys.
}

// fetchWeatherData(25.666815, -100.28233);

async function handleFetchClick(){ // Le da funcionalidad al botón
    console.log("Fetch button clicked");

    const cityName = document.getElementById("city-input").value; // Se accede a la API dom mediante document, usando el metodo getElementByID, se añade value para leer el valor.

    const firstCity = await getCoordinates(cityName); // Obtiene las coordenadas
    const latitude = firstCity.latitude; // Asigna las coordenadas a las variables
    const longitude = firstCity.longitude;
    
    /*
    const latitude = document.getElementById("latitude-input").value; // se accede a la api dom mediante document, usando el metodo getElementByID, se añade value para leer el valor. */

    const currentTemparature = document.getElementById("temp-display");
    const currentWind = document.getElementById("wind-display");

    const currentWeather = await fetchWeatherData(latitude, longitude);

    currentTemparature.textContent = currentWeather.temperature; // Referencia a lo que se encuentra entre los tags del html
    currentWind.textContent = currentWeather.windspeed;
}