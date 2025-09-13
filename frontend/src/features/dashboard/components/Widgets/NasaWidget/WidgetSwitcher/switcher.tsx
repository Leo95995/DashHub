import type { NasaWidgets } from "../../../../../../store/nasaSlice";

interface INasaSwitcher {
    changeSelectedWidget: (newWidget: NasaWidgets)=>void 
}

const Switcher: React.FC<INasaSwitcher> = ({changeSelectedWidget}) => {
  return (
    <button className="border px-3 py-1 rounded-md cursor-pointer hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-200 text-xs">
      Change widget
    </button>
  );
};

export default Switcher;
