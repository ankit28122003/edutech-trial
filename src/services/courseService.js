import { COURSES } from '../data/courses';
import { DOMAINS } from '../data/domains';

// --- MOCK IMPLEMENTATION -----------------------------------------------
// Every function here already has the exact async signature and return
// shape the real Express endpoints will use. When the backend is ready,
// swap each function body for an `api.get/post(...)` call — no caller
// (components, hooks) needs to change.
// -------------------------------------------------------------------------

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCourses({ category, search, sort } = {}) {
  await delay();
  let results = [...COURSES];

  if (category) {
    results = results.filter((c) => c.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
    );
  }
  if (sort === 'price-asc') results.sort((a, b) => a.priceINR - b.priceINR);
  if (sort === 'price-desc') results.sort((a, b) => b.priceINR - a.priceINR);
  if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);

  return results;

  // Future implementation:
  // const { data } = await api.get('/courses', { params: { category, search, sort } });
  // return data.courses;
}

export async function getFeaturedCourses(limit = 9) {
  await delay();
  return COURSES.filter((c) => c.trending).slice(0, limit);
}

export async function getCourseBySlug(slug) {
  await delay();
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) throw new Error('Course not found');
  return course;

  // Future implementation:
  // const { data } = await api.get(`/courses/${slug}`);
  // return data.course;
}

export async function getDomains() {
  await delay(150);
  return DOMAINS;
}

// --- ADMIN-ONLY MUTATIONS ------------------------------------------------
// These mutate the in-memory array only (resets on refresh) so the admin
// panel UI is fully wired and ready; only the request body/response shape
// needs to be reused when swapped for real POST/PUT/DELETE calls.

export async function createCourse(payload) {
  await delay(300);
  const newCourse = {
    id: `c${Date.now()}`,
    ...payload,
  };
  COURSES.unshift(newCourse);
  return newCourse;

  // Future implementation:
  // const { data } = await api.post('/admin/courses', payload);
  // return data.course;
}

export async function updateCourse(id, payload) {
  await delay(300);
  const index = COURSES.findIndex((c) => c.id === id);
  if (index === -1) throw new Error('Course not found');
  COURSES[index] = { ...COURSES[index], ...payload };
  return COURSES[index];

  // Future implementation:
  // const { data } = await api.put(`/admin/courses/${id}`, payload);
  // return data.course;
}

export async function deleteCourse(id) {
  await delay(300);
  const index = COURSES.findIndex((c) => c.id === id);
  if (index === -1) throw new Error('Course not found');
  COURSES.splice(index, 1);
  return { success: true };

  // Future implementation:
  // await api.delete(`/admin/courses/${id}`);
  // return { success: true };
}
