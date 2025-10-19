import { useState, useCallback } from "react";
import type { IGenericWidget } from "../features/dashboard/types";

export const useDragDrop = ({
  widgetId,
  handleDrop,
  setDraggedWidgetId,
}: Pick<IGenericWidget, "handleDrop" | "widgetId" | "setDraggedWidgetId">) => {
  const [dragging, setDragging] = useState<boolean>(false);

  const dragStartHandler = useCallback(() => {
    setDragging(true);
    setDraggedWidgetId(widgetId);
  }, [setDraggedWidgetId, widgetId]);

  const dragEndHandler = useCallback(() => {
    setDragging(false);
    setDraggedWidgetId(null);
  }, [setDraggedWidgetId]);

  const dropHandler = useCallback(() => {
    handleDrop(widgetId);
  }, [handleDrop, widgetId]);

  const dragOverHandler = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return {
    dragging,
    dragStartHandler,
    dragEndHandler,
    dropHandler,
    dragOverHandler,
  };
};
