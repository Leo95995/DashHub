import type { CryptoWidgets } from "../../features/dashboard/components/widgetSwitcher/types"
import { storage } from "./storage"

const CRYPTO_KEY = "crypto" 

const cryptoKey =  {
    getSelectedWidget: ()=> {
        return storage.getItem(`${CRYPTO_KEY}_selected`)
    },
    setSelectedWidget: (selectedWidget: CryptoWidgets )=> {
        storage.setItem(`${CRYPTO_KEY}_selected`, selectedWidget)
    }

}

export default cryptoKey