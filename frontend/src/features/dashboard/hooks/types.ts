export enum WidgetOrigin  {
    NASA = "NASA",
    CRYPTO = "CRYPTO",
    WEATHER = "WEATHER",
    GITHUB  = "GITHUB"
}


export interface WidgetSelectorParams {
  selector: (state: any) => any; 
  actionCreator: (value: any) => any; 
  origin : WidgetOrigin // This represent the name of the main widget (ex nasa)
}