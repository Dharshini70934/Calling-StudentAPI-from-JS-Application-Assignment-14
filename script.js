const API_BASE = 'http://localhost:3000/students';

const StudentAPI = {

  // ── READ ALL ──────────────────────────────────────────────
  async getAll() {
    const res = await fetch(`${API_BASE}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`GET failed: ${res.status} ${res.statusText}`);
    const json = await res.json();
    // Handle different API response shapes
    return Array.isArray(json) ? json : (json.data || json.students || json.results || []);
  },

  // ── READ ONE ──────────────────────────────────────────────
  async getById(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`GET failed: ${res.status} ${res.statusText}`);
    const json = await res.json();
    return json.data || json.student || json;
  },

  // ── CREATE ────────────────────────────────────────────────
  async create(studentData) {
    const res = await fetch(`${API_BASE}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
    if (!res.ok) throw new Error(`POST failed: ${res.status} ${res.statusText}`);
    return await res.json();
  },

  // ── UPDATE ────────────────────────────────────────────────
  async update(id, studentData) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studentData)
    });
    if (!res.ok) throw new Error(`PUT failed: ${res.status} ${res.statusText}`);
    return await res.json();
  },

  // ── DELETE ────────────────────────────────────────────────
  async delete(id) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`DELETE failed: ${res.status} ${res.statusText}`);
    // 204 No Content is a success for DELETE
    return true;
  }
};

// ── TOAST NOTIFICATION ────────────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-show'));
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}