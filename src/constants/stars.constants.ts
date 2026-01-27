import { IStars } from "../modules/models/stars.model";
import { TIMERESTRICTED_MISSIONS } from "./jobs.constants";
import { RED_ALERT_OIZYS, RED_ALERT_PHAENNA, RED_ALERT_SINUS_ARDORUM } from "./red-alerts.constants";
import { OIZYS_WEATHER, PHAENNA_WEATHER, SINUS_ARDORUM_WEATHER } from "./weather.constants";

export enum STARS {
  SINUS_ARDORUM = "SINUS_ARDORUM",
  PHAENNA = "PHAENNA",
  OIZYS = "OIZYS",
}

export const STARS_DATA: IStars = {
  [STARS.SINUS_ARDORUM]: {
    name: "Sinus Ardorum",
    nameShort: "Sinus A.",
    nameRole: "Moon",
    redAlerts: RED_ALERT_SINUS_ARDORUM,
    weather: SINUS_ARDORUM_WEATHER,
    timeRestrictedMissions: TIMERESTRICTED_MISSIONS[STARS.SINUS_ARDORUM],
  },
  [STARS.PHAENNA]: {
    name: "Phaenna",
    redAlerts: RED_ALERT_PHAENNA,
    weather: PHAENNA_WEATHER,
    timeRestrictedMissions: TIMERESTRICTED_MISSIONS[STARS.PHAENNA],
  },
  [STARS.OIZYS]: {
    name: "Oizys",
    redAlerts: RED_ALERT_OIZYS,
    weather: OIZYS_WEATHER,
    timeRestrictedMissions: TIMERESTRICTED_MISSIONS[STARS.OIZYS],
  },
};
