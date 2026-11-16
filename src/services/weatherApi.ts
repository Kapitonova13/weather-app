import type { City, WeatherResponse } from "../types/weather";
import { parseWeatherResponse } from "../utils/weatherUtils";

export async function searchCity(query: string, signal?: AbortSignal): Promise<City[]> {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=ru&format=json`

        const response = await fetch(url, {signal})

        if (!response.ok) {
            throw new Error(`Ошибка поиска города: ${response.status}`)
        }

        const data = await response.json()
        console.log('data', data);
        

        if (!data.results || !Array.isArray(data.results)) {
            return []
        }

        return data.results.map((item: any) => ({
            id: item.id,
            name: item.name,
            latitude: item.latitude,
            longitude: item.longitude,
            country: item.country ?? '',
        }))
}

export async function fetchWeather(latitude: number, longitude: number, signal?: AbortSignal): Promise<WeatherResponse> {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`

    const response = await fetch(url, {signal})
    // console.log('Статус ответа погоды:', response.status); 

    if (!response.ok) {
        throw new Error(`Ошибка загрузки погоды: ${response.status}`)
    }

    const json = await response.json()

    return parseWeatherResponse(json)  
}