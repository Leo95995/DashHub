export interface IGenericWidget  {
    widgetId: number
    isEditMode: boolean
    onHide: (val: any) => void // Action applied when the widget is hidden
    handleDrop: (widgetId: number) => void
    setDraggedWidgetId: (widgetId: number|null) => void
}