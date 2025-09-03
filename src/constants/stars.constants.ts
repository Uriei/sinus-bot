import { IStars } from "../modules/models/stars.model";
import { RED_ALERT_PHAENNA, RED_ALERT_SINUS_ARDORUM } from "./red-alerts.constants";
import { PHAENNA_WEATHER, SINUS_ARDORUM_WEATHER } from "./weather.constants";

export const STARS: IStars = {
  SINUS_ARDORUM: {
    name: "Sinus Ardorum",
    nameShort: "Sinus A.",
    nameRole: "Moon",
    redAlerts: RED_ALERT_SINUS_ARDORUM,
    weather: SINUS_ARDORUM_WEATHER,
  },
  PHAENNA: {
    name: "Phaenna",
    redAlerts: RED_ALERT_PHAENNA,
    weather: PHAENNA_WEATHER,
  },
};
