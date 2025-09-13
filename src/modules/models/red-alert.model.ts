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
  "en-US": Array<string>;
  de?: Array<string>;
  fr?: Array<string>;
  ja?: Array<string>;
}

export interface IRedAlertVariants {
  name: string;
  classes: Array<string>;
  image: string;
  hints?: iRedAlertHints;
}
