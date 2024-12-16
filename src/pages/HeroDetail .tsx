import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../stores/HeroesStore";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateHero } from "../slices/HeroeSlice";
import { Result } from "../models/Result";

const HeroDetail = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hero = useSelector((state: RootState) =>
    state.heroes.heroes.find((hero) => hero.id === Number(id))
  );

  const handleBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState({
    name: hero?.name || "",
    image: hero?.image || "",
    status: hero?.status || "",
    species: hero?.species || "",
    gender: hero?.gender || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHero: Result = {
      ...formData,
      id: Number(id),
    };
    dispatch(updateHero(updatedHero));
    handleBack();
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
            value={formData.name}
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
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Статус:</label>
          <input
            type="text"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Пришелец:</label>
          <input
            type="text"
            name="species"
            className="form-control"
            value={formData.species}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Пол:</label>
          <input
            type="text"
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default HeroDetail;
