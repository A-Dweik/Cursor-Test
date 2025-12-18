import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

export interface WeatherData {
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // Static payload to mimic a backend API response
  private readonly ammanWeather: WeatherData = {
    temperature: 24.5,
    windspeed: 11,
    weathercode: 2,
    time: '2025-06-18T09:00:00Z'
  };

  getAmmanWeather(): Observable<WeatherData> {
    // Simulate the latency of a real HTTP call so the UI states
    // (loading, last-updated, etc.) can still be showcased.
    return of(this.ammanWeather).pipe(delay(600));
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
}
