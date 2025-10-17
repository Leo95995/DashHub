// Questo sarà un wrapper che occupa il contenuto dinamico della pagina

interface IMainContent {
    children: React.ReactNode
}

const MainContent : React.FC<IMainContent> = ({children}) => {
    return <main className="p-4 m-0 bg-white  rounded-b-md  dark:bg-slate-800 max-h-235 dark:text-white">{children}</main>
}

export default MainContent