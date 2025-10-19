import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

interface WidgetSelectorParams {
  selector: (state: any) => any; 
  actionCreator: (value: any) => any; 
}

export const useWidgetSelector = ({ selector, actionCreator }: WidgetSelectorParams) => {
  const dispatch = useDispatch();
  const currentSelection = useSelector(selector);
  const setWidgetSelection = useCallback((widget: any) => {
    if (widget) {
    
      dispatch(actionCreator(widget) as any); 
    }
  }, [dispatch, actionCreator]); 

  return { currentSelection, setWidgetSelection };
};