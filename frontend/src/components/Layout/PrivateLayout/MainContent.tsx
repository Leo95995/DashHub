// Questo sarà un wrapper che occupa il contenuto dinamico della pagina

import type { IMainContent } from "./types"


const MainContent : React.FC<IMainContent> = ({children}) => {
    return <main className="p-4 m-0 bg-white  rounded-b-md  dark:bg-slate-800 max-h-235 dark:text-white">{children}</main>
}

export default MainContent