import { Episode } from "./Episode";
import { Origin } from "./Origin";
import { Location } from "./Location ";

export interface Result {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin | null;
  location: Location | null;
  image: string;
  episode: Episode[];
  url: string;
  created: string;
  isLiked: boolean;
}
