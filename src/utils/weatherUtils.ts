import type { WeatherResponse } from "../types/weather"

export function formatTemperature(celsius: number, unit: 'C' | 'F') {
    if (unit === 'C') {
        return `${Math.round(celsius)}°C`
    }
    return `${Math.round(celsius * 1.8 + 32)}°F` // °C = (°F − 32) × 5/9 
}

export function parseWeatherResponse(json: unknown): WeatherResponse {
    if (typeof json !== 'object' || json === null || !('current_weather' in json) || typeof (json as any).current_weather !== 'object') {
        throw new Error('Некорректный формат')
    }
    const cw = (json as any).current_weather

    if (typeof cw.temperature !== 'number' || typeof cw.windspeed !== 'number' || typeof cw.weathercode !== 'number') {
        throw new Error('Отсутствуют необходимые поля')
    }

    return {
        current_weather: {
            temperature: cw.temperature,
            windspeed: cw.windspeed,
            weathercode: cw.weathercode,
        }
    }
}

export function describeWeatherCode(code: number): string {
    const map: Record<number, string> = {
        0: 'Ясно',
        1: 'В основном ясно',
        2: 'Переменная облачность',
        3: 'Пасмурно',
        45: 'Туман',
        48: 'Изморозь',
        51: 'Лёгкая морось',
        61: 'Небольшой дождь',
        63: 'Умеренный дождь',
        65: 'Сильный дождь',
        71: 'Небольшой снег',
        80: 'Ливень',
        95: 'Гроза',
    }
    return map[code] ?? 'Неизвестно'
}