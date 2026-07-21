// --- MOCK IMPLEMENTATION -----------------------------------------------
// Matches the request/response shape the real /auth endpoints will use
// (JWT access token + httpOnly refresh-token cookie + RBAC role on the user).
// -------------------------------------------------------------------------

const SESSION_KEY = 'edutech_session_user';
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

export async function login({ email, password }) {
  await delay();
  if (!email || !password) throw new Error('Email and password are required');

  // Demo-only rule so the admin panel is reachable without a backend:
  // any @edutechskills.example email logs in as admin, everything else as a learner.
  const role = email.endsWith('@edutechskills.example') ? 'admin' : 'learner';
  const user = { id: 'u1', name: email.split('@')[0], email, role };

  localStorage.setItem('edutech_access_token', 'mock-jwt-token');
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { user };

  // Future implementation:
  // const { data } = await api.post('/auth/login', { email, password });
  // localStorage.setItem('edutech_access_token', data.accessToken);
  // return { user: data.user };
}

export async function register({ name, email, password }) {
  await delay();
  if (!name || !email || !password) throw new Error('All fields are required');

  const user = { id: 'u1', name, email, role: 'learner' };
  localStorage.setItem('edutech_access_token', 'mock-jwt-token');
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return { user };

  // Future implementation:
  // const { data } = await api.post('/auth/register', { name, email, password });
  // localStorage.setItem('edutech_access_token', data.accessToken);
  // return { user: data.user };
}

export async function logout() {
  await delay(100);
  localStorage.removeItem('edutech_access_token');
  localStorage.removeItem(SESSION_KEY);

  // Future implementation:
  // await api.post('/auth/logout'); // clears the httpOnly refresh cookie server-side
}

export async function getCurrentUser() {
  await delay(150);
  const saved = localStorage.getItem(SESSION_KEY);
  return saved ? JSON.parse(saved) : null;

  // Future implementation:
  // const { data } = await api.get('/auth/me');
  // return data.user;
}
