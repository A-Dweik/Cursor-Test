import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
  humidity?: number;
  feelsLike?: number;
  pressure?: number;
  windDirection?: number;
}

export interface OpenMeteoResponse {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
    winddirection: number;
  };
  current?: {
    relative_humidity_2m?: number;
    apparent_temperature?: number;
    surface_pressure?: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  
  // Amman, Jordan coordinates
  private readonly AMMAN_LAT = 31.9454;
  private readonly AMMAN_LON = 35.9284;
  
  // Open-Meteo API (free, no API key required)
  private readonly API_URL = 'https://api.open-meteo.com/v1/forecast';

  getAmmanWeather(): Observable<WeatherData> {
    const url = `${this.API_URL}?latitude=${this.AMMAN_LAT}&longitude=${this.AMMAN_LON}&current_weather=true&current=relative_humidity_2m,apparent_temperature,surface_pressure`;
    
    return this.http.get<OpenMeteoResponse>(url).pipe(
      map(response => ({
        temperature: response.current_weather.temperature,
        windspeed: response.current_weather.windspeed,
        weathercode: response.current_weather.weathercode,
        time: response.current_weather.time,
        windDirection: response.current_weather.winddirection,
        humidity: response.current?.relative_humidity_2m,
        feelsLike: response.current?.apparent_temperature,
        pressure: response.current?.surface_pressure
      }))
    );
  }

  getWeatherDescription(code: number): string {
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    return descriptions[code] || 'Unknown';
  }

  getWeatherIcon(code: number): string {
    if (code === 0) return '☀️';
    if (code <= 3) return '⛅';
    if (code <= 48) return '🌫️';
    if (code <= 55) return '🌧️';
    if (code <= 65) return '🌧️';
    if (code <= 75) return '❄️';
    if (code <= 82) return '🌦️';
    return '⛈️';
  }

  getWindDirection(degrees: number): string {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }
}
