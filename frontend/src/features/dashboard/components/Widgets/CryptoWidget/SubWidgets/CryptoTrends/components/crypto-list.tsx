import type React from "react"
import type { CryptoItem, ICryptoTrendings } from "../../../../../../../../mappers/cryptoMapper"
/**
 * render the lsit of crypto elements 
 */



interface ICryptoList { 
    items: ICryptoTrendings[]
}

const CryptoList: React.FC<ICryptoList> = ({items}) =>{

    console.log(items);
    return <></>

}

export default CryptoList