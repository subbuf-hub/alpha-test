import { Result } from "../models/Result";
import { useDispatch } from "react-redux";
import { likeHero, deleteHero } from "../slices/HeroeSlice";

interface HeroComponentProps {
  heroe: Result;
  onClick: () => void;
}

function HeroComponent({ heroe }: HeroComponentProps) {
  const dispatch = useDispatch();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(likeHero(heroe.id)); // Вызываем action likeHero
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteHero(heroe.id)); // Вызываем action deleteHero
  };

  return (
    <div className="col-md-4" key={heroe.id}>
      <div className="card" style={{ margin: "10px" }}>
        <img src={heroe.image} className="card-img-top" alt={heroe.name} />
        <div className="card-body">
          <h5 className="card-title">{heroe.name}</h5>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Жив:
            </label>
            <span id="status" className="card-text">
              <b>{heroe.status !== "Dead" ? " V" : ""}</b>
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="species" className="form-label">
              Пришелец:
            </label>
            <span id="species" className="card-text">
              <b> {heroe.species === "Alien" ? " V" : ""}</b>
            </span>
          </div>
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Пол:
            </label>
            <span id="gender" className="card-text">
              <b> {heroe.gender !== "Female" ? " муж" : " жен"}</b>
            </span>
          </div>
          <button
            onClick={handleLike} // Используем функцию обработки лайков
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "40px", // Ширина кнопки
              height: "40px", // Высота кнопки
              marginRight: "10px",
            }}
          >
            <span
              className={`bi${heroe.isLiked ? "-heart-fill" : "-heart"}`}
              style={{
                color: heroe.isLiked ? "red" : "grey",
                fontSize: "24px",
              }}
            ></span>
          </button>
          <button
            onClick={handleDelete} // Используем функцию обработки удаления
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              width: "40px", // Ширина кнопки
              height: "40px", // Высота кнопки
              float: "right",
            }}
          >
            <span
              className="bi bi-trash"
              style={{ color: "red", fontSize: "24px" }}
            ></span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroComponent;
