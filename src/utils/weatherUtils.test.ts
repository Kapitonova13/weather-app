import {describe, it, expect} from 'vitest'
import { describeWeatherCode, formatTemperature, parseWeatherResponse } from './weatherUtils'

describe('formatTemperature', () => {
    it('формирует Цельсий', () => {
        expect(formatTemperature(20, 'C')).toBe('20°C')
    })

    it('округляет Цельсий', () => {
        expect(formatTemperature(20.6, 'C')).toBe('21°C')
    })

    it('конвертирует в Фаренгейт', () => {
        expect(formatTemperature(0, 'F')).toBe('32°F')
        expect(formatTemperature(100, 'F')).toBe('212°F')
    })

    it('обрабатывает отрицательное значение', () => {
        expect(formatTemperature(-5, 'C')).toBe('-5°C')
        expect(formatTemperature(-5, 'F')).toBe('23°F')
    })
})

describe('parseWeatherResponce', () => {
    it('парсит валидный ответ', () => {
        const json = {
            current_weather: {temperature: 15, windspeed: 10, weathercode: 0 }
        }
        expect(parseWeatherResponse(json)).toEqual(json)
    })

    it('выбрасывает ошибку при отсутствии current_weather', () => {
        expect(() => parseWeatherResponse({})).toThrow('Некорректный формат')
    })

    it('выбрасывает ошибку при неполных полях', () => {
        expect(() => 
            parseWeatherResponse({current_weather: { temperature: 15 }})).toThrow('Отсутствуют необходимые поля')
    })
})

describe('describeWeatherCode', () => {
    it('возвращает описание для известного кода', () => {
        expect(describeWeatherCode(0)).toBe('Ясно')
        expect(describeWeatherCode(61)).toBe('Небольшой дождь')
    })

    it('возвращает "Неизвестно" для неизвестного кода', () => {
        expect(describeWeatherCode(999)).toBe('Неизвестно')
    })
})