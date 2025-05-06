export interface IWeatherData {
  important?: boolean;
  rate: number;
  name: string;
  emoji?: string | null;
}
export interface IWeatherReport extends IWeatherData {
  date: number;
  weatherChance?: number;
}
