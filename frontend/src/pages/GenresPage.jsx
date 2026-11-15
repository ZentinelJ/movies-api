import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createGenre, getGenres, updateGenre } from "../services/genre.service.js";

const EMPTY_FORM = { name: "", status: "Activo", description: "" };

function GenresPage() {
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const showError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "No se pudo conectar con la API",
    });
  };

  const loadGenres = () => {
    getGenres().then(setGenres).catch(showError);
  };

  useEffect(() => {
    loadGenres();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await updateGenre(editingId, form);
      } else {
        await createGenre(form);
      }
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Género guardado",
        showConfirmButton: false,
        timer: 2000,
      });
      setForm(EMPTY_FORM);
      setEditingId(null);
      loadGenres();
    } catch (error) {
      showError(error);
    }
  };

  const handleEdit = (genre) => {
    setForm({
      name: genre.name,
      status: genre.status,
      description: genre.description ?? "",
    });
    setEditingId(genre._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  return (
    <>
      <h1 className="h3">Géneros</h1>
      <p className="text-muted">Los géneros no se eliminan; se inactivan.</p>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 card-title">
            {editingId ? "Editar género" : "Nuevo género"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label" htmlFor="name">Nombre</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="status">Estado</label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  rows="3"
                  value={form.description}
                  onChange={handleChange}
                />
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
              <th>Nombre</th>
              <th>Estado</th>
              <th>Descripción</th>
              <th>Creado</th>
              <th>Actualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {genres.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No hay géneros registrados
                </td>
              </tr>
            ) : (
              genres.map((genre) => (
                <tr key={genre._id}>
                  <td>{genre.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        genre.status === "Activo" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {genre.status}
                    </span>
                  </td>
                  <td>{genre.description}</td>
                  <td>{new Date(genre.createdAt).toLocaleString("es-CO")}</td>
                  <td>{new Date(genre.updatedAt).toLocaleString("es-CO")}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(genre)}
                    >
                      Editar
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

export default GenresPage;
