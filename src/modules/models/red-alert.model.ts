import { CLASS_LIST } from "../../constants";

export interface IChannelRedAlertCooldown {
  [channelID: number]: number;
}

export interface IRedAlertType {
  name: string;
  emoji: string;
  image: string;
  variants?: Array<IRedAlertVariants>;
}

export interface IRedAlertVariants {
  name: string;
  classes: Array<CLASS_LIST>;
  image: string;
}
