import { JOBS } from "../../constants/jobs.constants";

export interface ITimeRestrictedMission {
  eorzeaTime: string;
  needsBaseUnlock: boolean;
}

export interface ITimeRestrictedMissions {
  [starName: string]: {
    [job in JOBS]?: ITimeRestrictedMission[];
  };
}
