import { JOBS } from "../../constants/jobs.constants";
import { STARS } from "../../constants/stars.constants";

export interface ITimeRestrictedMissionJob {
  eorzeaTime: string;
  needsBaseUnlock: boolean;
}
export type ITimeRestrictedMission = {
  [job in JOBS]: ITimeRestrictedMissionJob[];
};

export type ITimeRestrictedMissions = {
  [star in STARS]: ITimeRestrictedMission;
};
