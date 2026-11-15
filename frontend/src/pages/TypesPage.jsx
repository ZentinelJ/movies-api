import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createType, getTypes, updateType } from "../services/type.service.js";

const EMPTY_FORM = { name: "", description: "" };

function TypesPage() {
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

  const loadTypes = () => {
    getTypes().then(setTypes).catch(showError);
  };

  useEffect(() => {
    loadTypes();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await updateType(editingId, form);
      } else {
        await createType(form);
      }
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Tipo guardado",
        showConfirmButton: false,
        timer: 2000,
      });
      setForm(EMPTY_FORM);
      setEditingId(null);
      loadTypes();
    } catch (error) {
      showError(error);
    }
  };

  const handleEdit = (type) => {
    setForm({
      name: type.name,
      description: type.description ?? "",
    });
    setEditingId(type._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  return (
    <>
      <h1 className="h3">Tipos</h1>
      <p className="text-muted">Los tipos no se eliminan ni tienen estado.</p>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 card-title">
            {editingId ? "Editar tipo" : "Nuevo tipo"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12">
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
              <th>Descripción</th>
              <th>Creado</th>
              <th>Actualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {types.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No hay tipos registrados
                </td>
              </tr>
            ) : (
              types.map((type) => (
                <tr key={type._id}>
                  <td>{type.name}</td>
                  <td>{type.description}</td>
                  <td>{new Date(type.createdAt).toLocaleString("es-CO")}</td>
                  <td>{new Date(type.updatedAt).toLocaleString("es-CO")}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(type)}
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

export default TypesPage;
