import type { WeatherResponse } from "../types/weather";
import { describeWeatherCode, formatTemperature } from "../utils/weatherUtils";

interface WeatherCardProps {
    cityName: string,
    data: WeatherResponse,
    unit: 'C' | 'F',
    onRefresh: () => void,
}

export function WeatherCard({cityName, data, unit, onRefresh}: WeatherCardProps) {
    const {temperature, windspeed, weathercode} = data.current_weather

    return (
        <div className="weather-card">
            <h2>{cityName}</h2>
            <p className="temperature">{formatTemperature(temperature, unit)}</p>
            <p>{describeWeatherCode(weathercode)}</p>
            <p>Ветер: {windspeed} км/ч</p>
            <button onClick={onRefresh}>Обновить</button>
        </div>
    )
}