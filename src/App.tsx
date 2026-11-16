import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { SearchBar } from './components/SearchBar'
import type { City, WeatherState } from './types/weather'
import { fetchWeather, searchCity } from './services/weatherApi'
import { WeatherCard } from './components/WeatherCard'

function App() {
  const [searchResults, setSearchResults] = useState<City[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [weatherState, setWeatherState] = useState<WeatherState>({status: 'idle'})
  const [unit, setUnit] = useState<'C' | 'F'>('C')
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  const weatherAbortRef = useRef<AbortController | null>(null)

  const handleSearch = useCallback(async (query: string) => {
    setIsSearching(true)
    try {
      const cities = await searchCity(query)
      // console.log('cities', cities);
      
      setSearchResults(cities)
    } catch (err) {
      // console.log('err', err);
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  const loadWeather = useCallback(async (city: City) => {
    if (weatherAbortRef.current) {
      weatherAbortRef.current.abort()
    }
    const controller = new AbortController()
    weatherAbortRef.current = controller

    setSelectedCity(city)
    setSearchResults([])
    setWeatherState({status: 'loading'})

    try {
      const data = await fetchWeather(city.latitude, city.longitude, controller.signal)
      setWeatherState({status: 'success', data, cityName: city.name})
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return
      }
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка'

      setWeatherState({status: 'error', message})
    }
  }, [])

  // защита от утечек памяти
  useEffect(() => {
    return () => {
      if (weatherAbortRef.current) {
        weatherAbortRef.current.abort()
      }
    }
  }, [])

  const handleRefresh = useCallback(() => {
    if (selectedCity) {
      loadWeather(selectedCity)
    }
  }, [selectedCity, loadWeather])

  return (
    <div className='app'>
      <h1>Погода</h1>
      <div className='controls'>
        <SearchBar onSearch={handleSearch} onSelectCity={loadWeather} results={searchResults} isLoading={isSearching} />
        <button className='unit-toggle' onClick={() => setUnit((u) => u === 'C' ? 'F' : 'C')}>
          {unit === 'C' ? '°C → °F' : '°F → °C'}
        </button>
      </div>

      {weatherState.status === 'loading' && <p>Загрузка...</p>}

      {weatherState.status === 'error' && (
        <p className='error'>Ошибка: {weatherState.message}</p>
      )}

      {weatherState.status === 'success' && (
        <WeatherCard cityName={weatherState.cityName} data={weatherState.data} unit={unit} onRefresh={handleRefresh}/>
      )}
    </div>
  )
}

export default App
