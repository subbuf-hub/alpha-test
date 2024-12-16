import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/HeroesStore";
import { useState, useEffect } from "react";
import { updateHero } from "../slices/HeroeSlice";
import { Result } from "../models/Result";

const HeroDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const hero = useSelector((state: RootState) =>
    state.heroes.heroes.find((hero) => hero.id === Number(id))
  );

  const [formData, setFormData] = useState<Result | null>(null);

  useEffect(() => {
    if (hero) {
      setFormData({
        name: hero.name,
        image: hero.image,
        status: hero.status === "Dead" ? "Dead" : "Alive",
        species: hero.species === "Alien" ? "Alien" : "Human",
        gender: hero.gender,
        id: hero.id,
      });
    }
  }, [hero]);

  const handleBack = () => {
    navigate(`/heroes`, { state: { currentPage: state?.currentPage || 1 } });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData ? { ...prevData, [name]: value } : prevData
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(updateHero(formData));
      handleBack();
    }
  };

  if (!hero) {
    return <div className="text-center">Герой не найден</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <button className="btn btn-primary" onClick={handleBack}>
        Назад
      </button>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label className="form-label">Имя:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData?.name || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Изображение URL:</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={formData?.image || ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Статус:</label>
          <select
            name="status"
            className="form-control"
            value={formData?.status}
            onChange={handleChange}
            required
          >
            <option value="Alive" selected={hero.status === "Alive"}>
              Жив
            </option>
            <option value="Dead" selected={hero.status === "Dead"}>
              Не жив
            </option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Пришелец:</label>
          <select
            name="species"
            className="form-control"
            value={formData?.species}
            onChange={handleChange}
            required
          >
            <option value="Alien" selected={hero.species === "Alien"}>
              Да
            </option>
            <option value="Human" selected={hero.species === "Human"}>
              Нет
            </option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Пол:</label>
          <select
            name="gender"
            className="form-control"
            value={formData?.gender}
            onChange={handleChange}
            required
          >
            <option value="Female" selected={hero.gender === "Female"}>
              Жен
            </option>
            <option value="Male" selected={hero.gender === "Male"}>
              Муж
            </option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default HeroDetail;
