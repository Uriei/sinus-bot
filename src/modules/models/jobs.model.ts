import { JOBS } from "../../constants/jobs.constants";

export interface ITimeRestrictedMissionJob {
  eorzeaTime: string;
  needsBaseUnlock: boolean;
}
export type ITimeRestrictedMission = {
  [job in JOBS]: ITimeRestrictedMissionJob[];
};

export interface ITimeRestrictedMissions {
  [starName: string]: ITimeRestrictedMission;
}
