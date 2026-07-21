import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import SEO from '../../../components/common/SEO';
import { Input } from '../../../components/ui/FormField';
import Button from '../../../components/ui/Button';
import Rating from '../../../components/ui/Rating';
import EmptyState from '../../../components/ui/EmptyState';
import Spinner from '../../../components/ui/Spinner';
import { getCourses, deleteCourse } from '../../../services/courseService';

function ConfirmDeleteModal({ course, onCancel, onConfirm, isDeleting }) {
  if (!course) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-panel">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-ink">Delete course?</h3>
          <button onClick={onCancel} aria-label="Close">
            <X size={18} className="text-ink-soft" />
          </button>
        </div>
        <p className="mt-2 text-sm text-ink-muted">
          This will permanently remove <span className="font-medium text-ink">"{course.title}"</span> from the
          catalog. This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} size="sm">
            Cancel
          </Button>
          <Button variant="accent" onClick={onConfirm} size="sm" disabled={isDeleting}>
            {isDeleting ? <Spinner size={16} /> : 'Delete Course'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [courses, setCourses] = useState(null);
  const [search, setSearch] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function loadCourses() {
    getCourses().then(setCourses);
  }

  useEffect(() => {
    loadCourses();
  }, []);

  const filtered = (courses || []).filter((c) => c.title.toLowerCase().includes(search.toLowerCase()));

  async function handleDelete() {
    if (!pendingDelete) return;
    setIsDeleting(true);
    try {
      await deleteCourse(pendingDelete.id);
      toast.success('Course deleted');
      setPendingDelete(null);
      loadCourses();
    } catch (error) {
      toast.error(error.message || 'Failed to delete course');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <SEO title="Manage Courses" description="Add, edit, and delete courses." />
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Courses</h1>
          <p className="mt-1 text-sm text-ink-muted">{courses?.length ?? '—'} total courses in the catalog</p>
        </div>
        <Button to="/admin/courses/new" variant="accent">
          <Plus size={16} /> Add Course
        </Button>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
        <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-ink/[0.06] bg-white shadow-card">
        {!courses ? (
          <div className="flex justify-center py-16">
            <Spinner size={24} className="text-primary-500" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState title="No courses found" description="Try a different search term or add a new course." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-ink/[0.06] bg-surface-alt text-xs uppercase tracking-wider text-ink-soft">
                <tr>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Rating</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/[0.06]">
                {filtered.map((course) => (
                  <tr key={course.id} className="transition-colors hover:bg-surface-alt/60">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-alt text-base">
                          {course.logo}
                        </span>
                        <div className="max-w-xs">
                          <p className="truncate font-medium text-ink">{course.title}</p>
                          <p className="truncate text-xs text-ink-soft">{course.duration}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-ink-muted">{course.category}</td>
                    <td className="px-5 py-3.5 font-mono text-ink-muted">₹{course.priceINR.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5">
                      <Rating value={course.rating} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1.5">
                        <Link
                          to={`/admin/courses/${course.id}/edit`}
                          aria-label={`Edit ${course.title}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-primary-50 hover:text-primary-600"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => setPendingDelete(course)}
                          aria-label={`Delete ${course.title}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-accent-50 hover:text-accent-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        course={pendingDelete}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
