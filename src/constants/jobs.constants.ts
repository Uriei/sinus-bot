import { ITimeRestrictedMissions } from "../modules/models/jobs.model";
import { STARS_DATA } from "./stars.constants";

export enum JOBS {
  ALC = "ALC",
  ARM = "ARM",
  BSM = "BSM",
  BTN = "BTN",
  CRP = "CRP",
  CUL = "CUL",
  FSH = "FSH",
  GSM = "GSM",
  LTW = "LTW",
  MIN = "MIN",
  WVR = "WVR",
}

export const timeRestrictedMissions: ITimeRestrictedMissions = {
  [STARS_DATA.SINUS_ARDORUM.name]: {
    [JOBS.ALC]: [
      {
        eorzeaTime: "0000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1200",
        needsBaseUnlock: false,
      },
    ],
    [JOBS.ARM]: [
      {
        eorzeaTime: "0800",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "2000",
        needsBaseUnlock: false,
      },
    ],
    [JOBS.BSM]: [
      {
        eorzeaTime: "0400",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1600",
        needsBaseUnlock: false,
      },
    ],
    [JOBS.BTN]: [
      {
        eorzeaTime: "1000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "2200",
        needsBaseUnlock: false,
      },
    ],
    [JOBS.CRP]: [
      {
        eorzeaTime: "0000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1200",
        needsBaseUnlock: false,
      },
    ],
    [JOBS.CUL]: [
      {
        eorzeaTime: "0400",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1600",
        needsBaseUnlock: false,
      },
    ],
    [JOBS.FSH]: [
      {
        eorzeaTime: "0600",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1800",
        needsBaseUnlock: false,
      },
    ],
    [JOBS.GSM]: [
      {
        eorzeaTime: "0000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1200",
        needsBaseUnlock: false,
      },
    ],
    [JOBS.LTW]: [
      {
        eorzeaTime: "0400",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1600",
        needsBaseUnlock: false,
      },
    ],
    [JOBS.MIN]: [
      {
        eorzeaTime: "0200",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1400",
        needsBaseUnlock: false,
      },
    ],
    [JOBS.WVR]: [
      {
        eorzeaTime: "0800",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "2000",
        needsBaseUnlock: false,
      },
    ],
  },
  [STARS_DATA.PHAENNA.name]: {
    [JOBS.ALC]: [
      {
        eorzeaTime: "0000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1600",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "0800",
        needsBaseUnlock: true,
      },
    ],
    [JOBS.ARM]: [
      {
        eorzeaTime: "0800",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "0000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1600",
        needsBaseUnlock: true,
      },
    ],
    [JOBS.BSM]: [
      {
        eorzeaTime: "0400",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "2000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1200",
        needsBaseUnlock: true,
      },
    ],
    [JOBS.BTN]: [
      {
        eorzeaTime: "1000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "2000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "0000",
        needsBaseUnlock: true,
      },
    ],
    [JOBS.CRP]: [
      {
        eorzeaTime: "0000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1600",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "0800",
        needsBaseUnlock: true,
      },
    ],
    [JOBS.CUL]: [
      {
        eorzeaTime: "0400",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "2000",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1200",
        needsBaseUnlock: true,
      },
    ],
    [JOBS.FSH]: [
      {
        eorzeaTime: "0800",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "0400",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1600",
        needsBaseUnlock: true,
      },
    ],
    [JOBS.GSM]: [
      {
        eorzeaTime: "1200",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "0400",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "2000",
        needsBaseUnlock: true,
      },
    ],
    [JOBS.LTW]: [
      {
        eorzeaTime: "1600",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "0800",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "0000",
        needsBaseUnlock: true,
      },
    ],
    [JOBS.MIN]: [
      {
        eorzeaTime: "0200",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1200",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1600",
        needsBaseUnlock: true,
      },
    ],
    [JOBS.WVR]: [
      {
        eorzeaTime: "0800",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "1200",
        needsBaseUnlock: false,
      },
      {
        eorzeaTime: "0400",
        needsBaseUnlock: true,
      },
    ],
  },
};
