import ReactLoader from ".";

interface ILoaderWithMessage { 
    text?: string
    height?: string
}

const LoaderWithMessage: React.FC<ILoaderWithMessage> = ({text, height}) => {
  return <>
  <div className={`flex-col flex ${height ?? "h-90"} w-full gap-4 justify-center items-center`}>
    {text ?? 'Caricamento in corso...'}
    <ReactLoader/>
    </div>
  </>
};

export default LoaderWithMessage;
