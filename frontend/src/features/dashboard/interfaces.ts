export interface IGenericWidget  {
    widgetId: number
    isEditMode: boolean
    handleDrop: (widgetId: number) => void
    setDraggedWidgetId: (widgetId: number|null) => void
}