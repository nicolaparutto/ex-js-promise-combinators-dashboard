/*
Esercizio:
Utilizzare Promise.all() per creare una funzione getDashboardData(query), 
che accetta una città come input e recupera simultaneamente:

✅Nome completo della città e paese da  /destinations?search={query}
(result.name, result.country, nelle nuove proprietà city e country).
✅Il meteo attuale da /weathers?search={query}
(result.temperature e result.weather_description nella nuove proprietà temperature e weather).
✅Il nome dell’aeroporto principale da /airports?search={query}
(result.name nella nuova proprietà airport).

Utilizzerai Promise.all() per eseguire queste richieste in parallelo 
e poi restituirai un oggetto con i dati aggregati.
*/

async function getDashboardData(city) {
	try {
		const cityInfoData = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/destinations?search=${city}`).then(res => res.json());
		const cityWeatherData = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/weathers?search=${city}`).then(res => res.json());
		const cityAirportData = fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/airports?search=${city}`).then(res => res.json());


		const [destination, weather, airport] = await Promise.all([cityInfoData, cityWeatherData, cityAirportData]);
		console.log(destination, weather, airport);

		return {
			city: destination[0].name,
			country: destination[0].country,
			temperature: weather[0].temperature,
			weather: weather[0].weather_description,
			airport: airport[0].name
		}
	} catch (error) {
		throw new Error("Errore durante il recupero dei dati")
	}
}

getDashboardData('london')
	.then(res => {
		console.log(res)
		console.log(`
			${res.city} is in ${res.country}, today in ${res.city} are ${res.temperature} degrees 
			and the weather is ${res.weather}. The main airport in ${res.city} is ${res.airport}
		`);
	})
	.catch(error => console.error(error))