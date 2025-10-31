
export interface ApodData {
  url: string;
  title: string;
  explanation: string;
  media_type: "image" | "video";
  copyright?: string;
}

export interface ApodState {
  data: ApodData | null;
  loading: boolean;
  error: string | null;
  imageUrl: string | null; 
}
