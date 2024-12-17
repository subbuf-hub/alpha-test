import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHero, setMaxID } from "../slices/HeroeSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../stores/HeroesStore";

const CreateHeroe = () => {
  const maxId = useSelector((state: RootState) => state.heroes.maxId);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    status: "",
    species: "",
    gender: "",
  });

  const dispatch = useDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.image &&
      formData.status &&
      formData.species &&
      formData.gender
    ) {
      const newHero = {
        id: maxId,
        created: "",
        episode: [],
        isLiked: false,
        location: null,
        origin: null,
        type: "",
        url: "",
        ...formData,
      };
      dispatch(addHero(newHero));
      dispatch(setMaxID(maxId + 1));
      setFormData({
        name: "",
        image: "",
        status: "",
        species: "",
        gender: "",
      });
      navigate(-1);
    } else {
      alert("Все поля обязательны для заполнения!");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

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
          <select
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="" disabled></option>
            <option value="Alive">Жив</option>
            <option value="Dead">Не жив</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Пришелец:</label>
          <select
            name="species"
            className="form-control"
            value={formData.species}
            onChange={handleChange}
            required
          >
            <option value="" disabled></option>
            <option value="Alien">Да</option>
            <option value="Human">Нет</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Пол:</label>
          <select
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled></option>
            <option value="Female">Жен</option>
            <option value="Male">Муж</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">
          Сохранить
        </button>
      </form>
    </div>
  );
};

export default CreateHeroe;
