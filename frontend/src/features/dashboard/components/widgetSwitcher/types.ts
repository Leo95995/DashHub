export interface WidgetSwitcher {
  changeSelectedWidget: (newWidget: WidgetTypes) => void;
  widgetList : WidgetTypes[];
  switcherTitle?: string;
  switcherButtonText?: string;

}

export type NasaWidgets  =  "apod" | "rover"| "neows"

export type GithubWidgets = 'repos' | 'user-activity'| 'Random User'

export type WidgetTypes  = NasaWidgets | GithubWidgets

