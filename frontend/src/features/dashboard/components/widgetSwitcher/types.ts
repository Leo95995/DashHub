export interface WidgetSwitcher {
  changeSelectedWidget: (newWidget: WidgetTypes) => void;
  widgetSelected: WidgetTypes;
  widgetList : WidgetTypes[];
  switcherTitle?: string;
  switcherButtonText?: string;

}

export type NasaWidgets  =  "Pic Of The Day" | "CME"| "Near Earth Object"

export type GithubWidgets = 'Trending Repositories' | 'User Activity'| 'Random User'
 
export type CryptoWidgets = 'Trending Cryptos' | 'Crypto Details' | 'Top Cryptos'

export type WidgetTypes  = NasaWidgets | GithubWidgets | CryptoWidgets

