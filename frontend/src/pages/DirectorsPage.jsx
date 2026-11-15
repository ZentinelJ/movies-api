import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createDirector, getDirectors, updateDirector } from "../services/director.service.js";

const EMPTY_FORM = { names: "", status: "Activo" };

function DirectorsPage() {
  const [directors, setDirectors] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const showError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "No se pudo conectar con la API",
    });
  };

  const loadDirectors = () => {
    getDirectors().then(setDirectors).catch(showError);
  };

  useEffect(() => {
    loadDirectors();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await updateDirector(editingId, form);
      } else {
        await createDirector(form);
      }
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Director guardado",
        showConfirmButton: false,
        timer: 2000,
      });
      setForm(EMPTY_FORM);
      setEditingId(null);
      loadDirectors();
    } catch (error) {
      showError(error);
    }
  };

  const handleEdit = (director) => {
    setForm({
      names: director.names,
      status: director.status,
    });
    setEditingId(director._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  return (
    <>
      <h1 className="h3">Directores</h1>
      <p className="text-muted">Los directores no se eliminan; se inactivan.</p>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 card-title">
            {editingId ? "Editar director" : "Nuevo director"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label" htmlFor="names">Nombres</label>
                <input
                  id="names"
                  name="names"
                  className="form-control"
                  value={form.names}
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
              <th>Nombres</th>
              <th>Estado</th>
              <th>Creado</th>
              <th>Actualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {directors.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No hay directores registrados
                </td>
              </tr>
            ) : (
              directors.map((director) => (
                <tr key={director._id}>
                  <td>{director.names}</td>
                  <td>
                    <span
                      className={`badge ${
                        director.status === "Activo" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {director.status}
                    </span>
                  </td>
                  <td>{new Date(director.createdAt).toLocaleString("es-CO")}</td>
                  <td>{new Date(director.updatedAt).toLocaleString("es-CO")}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(director)}
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

export default DirectorsPage;
