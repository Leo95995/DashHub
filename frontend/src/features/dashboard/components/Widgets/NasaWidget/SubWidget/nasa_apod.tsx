export interface IApodWidget {
  data: ApoData;
  loading: boolean;
  error: string | null;
}

export interface ApoData {
  date: string;
  explanation: string;
  url: string;
  title: string;
}

const ApodWidget: React.FC<IApodWidget> = ({ data, error, loading }) => {
  const { date, explanation, url, title } = data;

  if (error) {
    return <>Errore nel caricamento</>;
  }

  if (loading) {
    return <>Caricamento...</>;
  }


  return (
    <>
      <div className="flex justify-between items-center mb-2 text-sm  dark:text-gray-400">
        <span>{date}</span>
      </div>
      <h3 className="text-lg font-bold text-center  dark:text-gray-200 mb-1 drop-shadow-md">
        NASA APOD
      </h3>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-3 font-medium text-sm">
        {title}
      </p>
      <div className="relative rounded-2xl mb-3 w-full max-w-[12rem] aspect-square mx-auto overflow-hidden shadow-lg">
         <embed
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          src={url}
        />
        {/* <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          src={url}
          loading="lazy"
          decoding="async"
          alt={title}
        /> */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
      </div>
      <p className="text-black-500 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 overflow-ellipsis">
        {explanation}
      </p>
    </>
  );
};
export default ApodWidget;
