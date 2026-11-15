import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  createMedia,
  deleteMedia,
  getMedia,
  updateMedia,
} from "../services/media.service.js";
import { getGenres } from "../services/genre.service.js";
import { getDirectors } from "../services/director.service.js";
import { getProducers } from "../services/producer.service.js";
import { getTypes } from "../services/type.service.js";

const EMPTY_FORM = {
  serial: "",
  title: "",
  synopsis: "",
  url: "",
  coverImage: "",
  releaseYear: "",
  genre: "",
  director: "",
  producer: "",
  type: "",
};

function MediaPage() {
  const [media, setMedia] = useState([]);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const showError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "No se pudo conectar con la API",
    });
  };

  const loadMedia = () => {
    getMedia().then(setMedia).catch(showError);
  };

  const loadData = () => {
    Promise.all([
      getMedia(),
      getGenres(),
      getDirectors(),
      getProducers(),
      getTypes(),
    ])
      .then(([mediaList, genreList, directorList, producerList, typeList]) => {
        setMedia(mediaList);
        setGenres(genreList);
        setDirectors(directorList);
        setProducers(producerList);
        setTypes(typeList);
      })
      .catch(showError);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...form, releaseYear: Number(form.releaseYear) };
    try {
      if (editingId) {
        await updateMedia(editingId, data);
      } else {
        await createMedia(data);
      }
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Media guardada",
        showConfirmButton: false,
        timer: 2000,
      });
      setForm(EMPTY_FORM);
      setEditingId(null);
      loadMedia();
    } catch (error) {
      showError(error);
    }
  };

  const handleEdit = (item) => {
    setForm({
      serial: item.serial,
      title: item.title,
      synopsis: item.synopsis,
      url: item.url,
      coverImage: item.coverImage,
      releaseYear: String(item.releaseYear),
      genre: item.genre._id,
      director: item.director._id,
      producer: item.producer._id,
      type: item.type._id,
    });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      icon: "warning",
      title: `¿Eliminar "${item.title}"?`,
      text: "Esta acción no se puede deshacer",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!result.isConfirmed) {
      return;
    }
    try {
      await deleteMedia(item._id);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Media eliminada",
        showConfirmButton: false,
        timer: 2000,
      });
      if (editingId === item._id) {
        setForm(EMPTY_FORM);
        setEditingId(null);
      }
      loadMedia();
    } catch (error) {
      showError(error);
    }
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  return (
    <>
      <h1 className="h3 mb-4">Películas y series</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 card-title">
            {editingId ? "Editar película o serie" : "Nueva película o serie"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label" htmlFor="serial">Serial</label>
                <input
                  id="serial"
                  name="serial"
                  className="form-control"
                  value={form.serial}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="title">Título</label>
                <input
                  id="title"
                  name="title"
                  className="form-control"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <label className="form-label" htmlFor="releaseYear">Año</label>
                <input
                  id="releaseYear"
                  name="releaseYear"
                  type="number"
                  className="form-control"
                  value={form.releaseYear}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="url">URL de la película</label>
                <input
                  id="url"
                  name="url"
                  type="url"
                  className="form-control"
                  value={form.url}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="coverImage">URL de la portada</label>
                <input
                  id="coverImage"
                  name="coverImage"
                  type="url"
                  className="form-control"
                  value={form.coverImage}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="synopsis">Sinopsis</label>
                <textarea
                  id="synopsis"
                  name="synopsis"
                  className="form-control"
                  rows="3"
                  value={form.synopsis}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="genre">Género</label>
                <select
                  id="genre"
                  name="genre"
                  className="form-select"
                  value={form.genre}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona...</option>
                  {genres
                    .filter((g) => g.status === "Activo" || g._id === form.genre)
                    .map((g) => (
                      <option key={g._id} value={g._id}>
                        {g.status === "Activo" ? g.name : `${g.name} (inactivo)`}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="director">Director</label>
                <select
                  id="director"
                  name="director"
                  className="form-select"
                  value={form.director}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona...</option>
                  {directors
                    .filter((d) => d.status === "Activo" || d._id === form.director)
                    .map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.status === "Activo" ? d.names : `${d.names} (inactivo)`}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="producer">Productora</label>
                <select
                  id="producer"
                  name="producer"
                  className="form-select"
                  value={form.producer}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona...</option>
                  {producers
                    .filter((p) => p.status === "Activo" || p._id === form.producer)
                    .map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.status === "Activo" ? p.name : `${p.name} (inactivo)`}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label" htmlFor="type">Tipo</label>
                <select
                  id="type"
                  name="type"
                  className="form-select"
                  value={form.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona...</option>
                  {types.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-3">
              <button type="submit" className="btn btn-primary me-2">
                Guardar
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th>Portada</th>
              <th>Título</th>
              <th>Año</th>
              <th>Tipo</th>
              <th>Género</th>
              <th>Director</th>
              <th>Productora</th>
              <th>Actualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {media.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No hay películas ni series registradas
                </td>
              </tr>
            ) : (
              media.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      width="48"
                      loading="lazy"
                    />
                  </td>
                  <td>
                    {item.title}
                    <br />
                    <small className="text-muted">{item.serial}</small>
                  </td>
                  <td>{item.releaseYear}</td>
                  <td>{item.type?.name}</td>
                  <td>{item.genre?.name}</td>
                  <td>{item.director?.names}</td>
                  <td>{item.producer?.name}</td>
                  <td>{new Date(item.updatedAt).toLocaleString("es-CO")}</td>
                  <td className="text-nowrap">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(item)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(item)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default MediaPage;
