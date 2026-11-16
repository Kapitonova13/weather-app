import React, { useState } from "react";
import type { City } from "../types/weather";


interface SearchBarProps {
    onSearch: (query: string) => void,
    onSelectCity: (city: City) => void,
    results: City[],
    isLoading: boolean,
}

export function SearchBar({onSearch, onSelectCity, results, isLoading}: SearchBarProps) {
    const [query, setQuery] = useState('')

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query.trim())
        }
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Введите город..." disabled={isLoading} />
                <button type="submit" disabled={isLoading || !query.trim()}>
                    {isLoading ? 'Поиск...' : 'Найти'}
                </button>
            </form>

            {results.length > 0 && (
                <ul className="search-results">
                    {results.map((city)=> (
                        <li key={city.id}>
                            <button type="button" onClick={()=>onSelectCity(city)}>
                                {city.name}, {city.country}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}