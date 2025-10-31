// React
import { useState, useCallback } from "react";
// Storage
import DashboardStorage from "../../../services/storage/dashboard";
// Datas
// import { getWidgetList } from "../data/widget-list";
// Types
import type { DraggableWidget } from "../types";


export const useWidgetRender = (filters: any, widgetList: any[]) => {

  const storageWidgetOrder = DashboardStorage.widgets.getWidgetOrder();
  const [widgetOrder, setWidgetOrder] = useState<number[]>(
    storageWidgetOrder ?? [1, 4, 2, 3]
  );

  const [draggedWidgetId, setDraggedWidgetId] = useState<number | null>(null);



  const getVisibleWidgetsNumber = useCallback(() => {
    const result = widgetList.filter((widget)=> widget.visibility === true).length
    return result;
  },[])



  const renderWidgetByOrder = useCallback(() => {
    const orderedList: DraggableWidget[] = [];

    widgetOrder.map((number) => {
      const res = widgetList.find(
        (widget: DraggableWidget) => widget.widgetId === number
      );
      if (res) {
        orderedList.push(res);
      }
    });
    return orderedList;
  }, [widgetOrder, filters]);

  /**
   * Func used to track the dragging and the drop with the new order
   *
   * @param widgetId
   * @returns
   */
  const handleDrop = useCallback(
    (widgetId: number) => {
      if (draggedWidgetId === null) return;

      const indexOfDragged = widgetOrder.indexOf(draggedWidgetId);
      const indexOfDroppedOn = widgetOrder.indexOf(widgetId);

      // if not existent i exit
      if (indexOfDragged === -1 || indexOfDroppedOn === -1) return;

      const newList = [...widgetOrder];

      [newList[indexOfDragged], newList[indexOfDroppedOn]] = [
        newList[indexOfDroppedOn],
        newList[indexOfDragged],
      ];

      setWidgetOrder(newList);
      setDraggedWidgetId(null);
    },
    [draggedWidgetId, widgetOrder]
  );

  return { getVisibleWidgetsNumber, handleDrop, renderWidgetByOrder, widgetOrder, setDraggedWidgetId };
};
