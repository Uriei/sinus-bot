import { ITimeRestrictedMission } from "./jobs.model";
import { IRedAlertType } from "./red-alert.model";
import { IWeatherData } from "./weather-report.model";

export interface IStar {
  name: string;
  nameShort?: string;
  nameRole?: string;
  redAlerts?: IRedAlertType[];
  weather?: IWeatherData[];
  timeRestrictedMissions?: ITimeRestrictedMission;
}

export interface IStars {
  [star: string]: IStar;
}
