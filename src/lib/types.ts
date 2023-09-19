export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  original_language: string;
  popularity: number;
};
export type TVShow = {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
  original_language: string;
  popularity: number;
};

export type MovieDetails = {
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
  genres: [{ id: number; name: string }];
  overview: string;
};
export type TVShowDetails = {
  poster_path: string;
  name: string;
  vote_average: number;
  first_air_date: string;
  genres: [{ id: number; name: string }];
  overview: string;
};

export type Credits = {
  cast: Cast[];
  crew: Crew[];
  id: number;
};

export type Cast = {
  id: number;
  profile_path: string;
  name: string;
  character: string;
};

export type Crew = {
  id: number;
  name: string;
  job: string;
};

export type Image = {
  id: number;
  backdrops: Backdrop[];
};
export type Backdrop = {
  file_path: string;
  height: number;
  width: number;
};
export type Filter = {
    rating: number;
  originalLanguage: string;
  popularity: number;
}