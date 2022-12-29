import { Movie } from 'entities/movie';
import { useNavigate } from 'react-router';

interface Props {
  movie: Movie;
}

export const Row = ({ movie }: Props) => {
  const navigate = useNavigate();

  return (
    <tr
      key={movie.imdbID}
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      className="cursor-pointer odd:bg-gray-200 even:bg-white"
    >
      <td>
        <img src={movie.poster} alt={movie.title} width="50" height="50" />
      </td>
      <td>{movie.title}</td>
      <td>{movie.type}</td>
      <td>{movie.year}</td>
    </tr>
  );
};
