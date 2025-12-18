import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';

export interface ForecastEntry {
  day: string;
  conditionCode: number;
  high: number;
  low: number;
}

export interface WeatherData {
  city: string;
  country: string;
  updatedAt: string;
  temperature: number;
  feelsLike: number;
  conditionCode: number;
  windSpeed: number;
  humidity: number;
  high: number;
  low: number;
  sunrise: string;
  sunset: string;
  forecast: ForecastEntry[];
}

interface StaticWeatherPayload {
  city: string;
  country: string;
  updatedAt: string;
  current: {
    temperatureC: number;
    feelsLikeC: number;
    conditionCode: number;
    windKph: number;
    humidity: number;
  };
  day: {
    highC: number;
    lowC: number;
    sunrise: string;
    sunset: string;
  };
  forecast: Array<{
    day: string;
    conditionCode: number;
    highC: number;
    lowC: number;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private readonly STATIC_ENDPOINT = '/api/weather.json';

  getCityWeather(): Observable<WeatherData> {
    return this.http.get<StaticWeatherPayload>(this.STATIC_ENDPOINT).pipe(
      map((payload) => ({
        city: payload.city,
        country: payload.country,
        updatedAt: payload.updatedAt,
        temperature: payload.current.temperatureC,
        feelsLike: payload.current.feelsLikeC,
        conditionCode: payload.current.conditionCode,
        windSpeed: payload.current.windKph,
        humidity: payload.current.humidity,
        high: payload.day.highC,
        low: payload.day.lowC,
        sunrise: payload.day.sunrise,
        sunset: payload.day.sunset,
        forecast: (payload.forecast ?? []).map((entry) => ({
          day: entry.day,
          conditionCode: entry.conditionCode,
          high: entry.highC,
          low: entry.lowC
        }))
      })),
      shareReplay(1)
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
}
