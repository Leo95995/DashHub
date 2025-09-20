import type { CryptoWidgets } from "../../../widgetSwitcher/types"
import CryptoDetail from "./CryptoDetail"
import CryptoTrendings from "./CryptoTrends"
import CryptoGainersAndLosers from "./CryptoGainersAndLosers"

interface CryptoContainer {
    widget : CryptoWidgets
}

const CryptoWidgetContainer : React.FC<CryptoContainer> = ({widget}) => {

    const renderCryptoWidget = () => {
        return widget === 'Crypto Details' ? <CryptoDetail/> : widget === 'Trending Cryptos' ? <CryptoTrendings/> :  <CryptoGainersAndLosers/>
    }

    return <>{renderCryptoWidget()}</>
}

export default CryptoWidgetContainer