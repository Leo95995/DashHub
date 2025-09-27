export interface WidgetSwitcher {
  changeSelectedWidget: (newWidget: WidgetTypes) => void;
  widgetSelected: WidgetTypes;
  widgetList : WidgetTypes[];
  switcherTitle?: string;
  switcherButtonText?: string;

}

export type NasaWidgets  =  "apod" | "rover"| "neows"

export type GithubWidgets = 'repos' | 'user-activity'| 'Random User'
 
export type CryptoWidgets = 'Trending Cryptos' | 'Crypto Details' | 'Top Cryptos'

export type WidgetTypes  = NasaWidgets | GithubWidgets | CryptoWidgets

