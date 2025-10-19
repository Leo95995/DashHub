export interface IGenericWidget  {
    widgetId: number
    isEditMode: boolean
    handleDrop: (widgetId: number) => void
    setDraggedWidgetId: (widgetId: number|null) => void
}


export type NasaWidgets  =  "Pic Of The Day" | "CME"| "Near Earth Object"

export type GithubWidgets = 'Trending Repositories' | 'User Activity'| 'Random User'
 
export type CryptoWidgets = 'Trending Cryptos' | 'Crypto Details' | 'Top Cryptos'

export type WidgetTypes  = NasaWidgets | GithubWidgets | CryptoWidgets

