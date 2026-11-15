import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createProducer, getProducers, updateProducer } from "../services/producer.service.js";

const EMPTY_FORM = { name: "", status: "Activo", slogan: "", description: "" };

function ProducersPage() {
  const [producers, setProducers] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const showError = (error) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.message || "No se pudo conectar con la API",
    });
  };

  const loadProducers = () => {
    getProducers().then(setProducers).catch(showError);
  };

  useEffect(() => {
    loadProducers();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateProducer(editingId, form);
      } else {
        await createProducer(form);
      }
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Productora guardada",
        showConfirmButton: false,
        timer: 2000,
      });
      setForm(EMPTY_FORM);
      setEditingId(null);
      loadProducers();
    } catch (error) {
      showError(error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (producer) => {
    setForm({
      name: producer.name,
      status: producer.status,
      slogan: producer.slogan ?? "",
      description: producer.description ?? "",
    });
    setEditingId(producer._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
  };

  return (
    <>
      <h1 className="h3 mb-4">Productoras</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="h5 card-title">
            {editingId ? "Editar productora" : "Nueva productora"}
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
                <label className="form-label" htmlFor="slogan">Slogan</label>
                <input
                  id="slogan"
                  name="slogan"
                  className="form-control"
                  value={form.slogan}
                  onChange={handleChange}
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
              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={saving}
              >
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
              <th>Slogan</th>
              <th>Descripción</th>
              <th>Creado</th>
              <th>Actualizado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {producers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No hay productoras registradas
                </td>
              </tr>
            ) : (
              producers.map((producer) => (
                <tr key={producer._id}>
                  <td>{producer.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        producer.status === "Activo" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {producer.status}
                    </span>
                  </td>
                  <td>{producer.slogan}</td>
                  <td>{producer.description}</td>
                  <td>{new Date(producer.createdAt).toLocaleString("es-CO")}</td>
                  <td>{new Date(producer.updatedAt).toLocaleString("es-CO")}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(producer)}
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

export default ProducersPage;
