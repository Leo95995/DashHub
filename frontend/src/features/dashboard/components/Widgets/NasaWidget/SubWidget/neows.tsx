import type { NasaItemStatus, INeoWsData } from "../../../../../../store/interfaces/interfaces";

const NeoWsWidget : React.FC<NasaItemStatus<INeoWsData>> =({data, loading, error}) => {
   
    console.log(data)
   
    return <>Neoino</>
}

export default NeoWsWidget