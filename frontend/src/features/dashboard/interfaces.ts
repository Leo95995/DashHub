export interface IGenericWidget  {
    widgetId: number
    isEditMode: boolean
    onHide: (val: any) => void // Action applied when the widget is hidden
}