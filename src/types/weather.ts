export interface City {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
    country: string,
}

export interface WeatherResponse {
    current_weather: {
        temperature: number,
        windspeed: number,
        weathercode: number,
    }
}

export type WeatherState = 
    | {status: 'idle' } 
    | {status: 'loading' } 
    | {status: 'error', message: string } 
    | {status: 'success', data: WeatherResponse, cityName: string } 

