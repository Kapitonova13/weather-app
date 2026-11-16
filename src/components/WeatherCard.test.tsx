import { describe, expect, it, vi } from "vitest";
import type { WeatherResponse } from "../types/weather";
import { render, screen } from '@testing-library/react';
import { WeatherCard } from "./WeatherCard";

const mockData: WeatherResponse = {
    current_weather: {temperature: 20, windspeed: 15, weathercode: 0}
}

describe('WeatherCard', () => {
    it('отображает название города и температуру', () => {
        render(
            <WeatherCard cityName="Москва" data={mockData} unit="C" onRefresh={vi.fn()}/>
        )

        expect(screen.getByText('Москва')).toBeInTheDocument()
        expect(screen.getByText('20°C')).toBeInTheDocument()
        expect(screen.getByText('Ясно')).toBeInTheDocument()

    })

    it('переключение на Фарингейт', () => {
        render(
            <WeatherCard cityName="Москва" data={mockData} unit="F" onRefresh={vi.fn()}/>
        )

        expect(screen.getByText('68°F')).toBeInTheDocument()
    })
})