export interface IChannelRedAlertCooldown {
  [channelID: number]: number;
}

export interface IRedAlertType {
  name: string;
  emoji: string;
  image: string;
  variants?: Array<IRedAlertVariants>;
}
export interface iRedAlertHints {
  en: Array<string>;
  de?: Array<string>;
  fr?: Array<string>;
  jp?: Array<string>;
}

export interface IRedAlertVariants {
  name: string;
  classes: Array<string>;
  image: string;
  hints?: iRedAlertHints;
}
