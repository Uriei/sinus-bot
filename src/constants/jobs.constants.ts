import { ITimeRestrictedMissions } from "../modules/models/jobs.model";

export enum JOBS {
  ALC = "ALC",
  ARM = "ARM",
  BSM = "BSM",
  CRP = "CRP",
  CUL = "CUL",
  GSM = "GSM",
  LTW = "LTW",
  WVR = "WVR",
  BTN = "BTN",
  MIN = "MIN",
  FSH = "FSH",
}

export enum JOB_NAMES {
  ALC = "Alchemist",
  ARM = "Armorer",
  BSM = "Blacksmith",
  BTN = "Botanist",
  CRP = "Carpenter",
  CUL = "Culinarian",
  FSH = "Fisher",
  GSM = "Goldsmith",
  LTW = "Leatherworker",
  MIN = "Miner",
  WVR = "Weaver",
}

export enum JOB_EMOJIS {
  ALC = "1421934963468800070",
  ARM = "1421934972868235365",
  BSM = "1421934982422728734",
  BTN = "1421934991318843432",
  CRP = "1421935001083318423",
  CUL = "1421935010331496608",
  FSH = "1421935021358448802",
  GSM = "1421935029906440304",
  LTW = "1421935038638985237",
  MIN = "1421935046935183493",
  WVR = "1421935055483306175",
}

export const TIMERESTRICTED_MISSIONS: ITimeRestrictedMissions = {
  SINUS_ARDORUM: {
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
  PHAENNA: {
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
