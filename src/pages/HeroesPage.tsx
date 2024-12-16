import { useEffect, useState } from "react";
import HeroComponent from "../controls/HeroComponent";
import { fetchData } from "../apis/HeroesApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/HeroesStore";
import { addHero, loadPageUp } from "../slices/HeroeSlice";
import { useLocation, useNavigate } from "react-router-dom";

function HeroesPage() {
  const location = useLocation();
  const [page, setPage] = useState(location.state?.currentPage || 1);
  const [allCountHeroes, setAllCountHeroes] = useState(0);
  const heroesCountinPage = 9;
  const history = useNavigate();
  const dispatch = useDispatch();

  const heroes = useSelector((state: RootState) => state.heroes.heroes);
  const laodPage = useSelector((state: RootState) => state.heroes.loadingPage);
  useEffect(() => {
    const loadHeroes = async () => {
      try {
        const data = await fetchData(1);
        setAllCountHeroes(data.info.count);
        data.results.forEach((hero) => {
          dispatch(addHero(hero));
        });
      } catch (error) {
        console.log("Ошибка загрузки: ", error);
      }
    };

    loadHeroes();
  }, []);

  const totalPages = Math.ceil(heroes.length / heroesCountinPage);
  const paginatedHeroes = heroes.slice(
    (page - 1) * heroesCountinPage,
    page * heroesCountinPage
  );
  const paginate = async (newPage: number) => {
    setPage(newPage);
    if (newPage === totalPages - 1 && heroes.length < allCountHeroes) {
      dispatch(loadPageUp(laodPage + 1));
      const data = await fetchData(laodPage + 1);
      data.results.forEach((hero) => {
        dispatch(addHero(hero));
      });
    }
  };

  const handleCardClick = (id: string) => {
    history(`/heroes/${id}`, { state: { currentPage: page } });
  };
  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
        <button
          className="btn btn-secondary me-2"
          disabled={page === 1}
          onClick={() => paginate(page - 1)}
        >
          Предыдущая
        </button>
        <span className="mx-2"> Страница {page} </span>
        <button
          className="btn btn-secondary"
          disabled={page === totalPages}
          onClick={() => paginate(page + 1)}
        >
          Следующая
        </button>
      </div>
      <div className="row">
        {paginatedHeroes.length > 0 ? (
          paginatedHeroes.map((heroe) => (
            <HeroComponent
              key={heroe.id}
              heroe={heroe}
              onClick={() => handleCardClick(heroe.id.toString())}
            />
          ))
        ) : (
          <p>Загрузка героев...</p>
        )}
      </div>
    </div>
  );
}

export default HeroesPage;
