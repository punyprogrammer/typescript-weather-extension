const OPEN_WEATHER_API = "13a369b7a1ee82b6741745b70e8f076a";
export interface OpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    deg: number;
    speed: number;
  };
}
export async function fetchOpenWeatherData(
  city: string
): Promise<OpenWeatherData> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=13a369b7a1ee82b6741745b70e8f076a`
  );
  if (!res.ok) {
    throw new Error(`City not found !`);
  }
  const data: OpenWeatherData = await res.json();

  return data;
}
