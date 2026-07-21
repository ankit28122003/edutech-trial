import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Plus, X, ArrowLeft } from 'lucide-react';
import SEO from '../../../components/common/SEO';
import { Label, Input, Textarea, Select, FieldError } from '../../../components/ui/FormField';
import Button from '../../../components/ui/Button';
import Spinner from '../../../components/ui/Spinner';
import { getFieldErrors } from '../../../lib/validation';
import { DOMAINS } from '../../../data/domains';
import { slugify } from '../../../lib/utils';
import { getCourses, createCourse, updateCourse } from '../../../services/courseService';

const courseSchema = z.object({
  title: z.string().min(4, 'Title must be at least 4 characters'),
  category: z.string().min(1, 'Select a category'),
  format: z.string().min(1, 'Format is required'),
  duration: z.string().min(1, 'Duration is required'),
  level: z.string().min(1, 'Select a level'),
  logo: z.string().min(1, 'Add a short emoji or icon label'),
  heroImage: z.string().url('Enter a valid image URL'),
  priceINR: z.coerce.number().positive('Price must be greater than 0'),
  originalPriceINR: z.coerce.number().positive('Original price must be greater than 0'),
  shortDescription: z.string().min(10, 'Add a short description (10+ characters)'),
  longDescription: z.string().min(20, 'Add a longer description (20+ characters)'),
});

const EMPTY_FORM = {
  title: '',
  category: DOMAINS[0].name,
  format: 'Program',
  duration: '',
  level: 'Beginner',
  logo: '🎓',
  heroImage: '',
  priceINR: '',
  originalPriceINR: '',
  shortDescription: '',
  longDescription: '',
  trending: false,
};

export default function CourseFormPage() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [values, setValues] = useState(EMPTY_FORM);
  const [learningPoints, setLearningPoints] = useState(['']);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditMode) return;
    getCourses().then((courses) => {
      const existing = courses.find((c) => c.id === id);
      if (existing) {
        setValues({ ...EMPTY_FORM, ...existing });
        setLearningPoints(existing.whatYouWillLearn?.length ? existing.whatYouWillLearn : ['']);
      }
      setIsLoading(false);
    });
  }, [id, isEditMode]);

  function updateField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  function updateLearningPoint(index, value) {
    setLearningPoints((points) => points.map((p, i) => (i === index ? value : p)));
  }

  function addLearningPoint() {
    setLearningPoints((points) => [...points, '']);
  }

  function removeLearningPoint(index) {
    setLearningPoints((points) => points.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { errors: fieldErrors, data } = getFieldErrors(courseSchema, values);
    setErrors(fieldErrors || {});
    if (fieldErrors) return;

    const payload = {
      ...data,
      slug: values.slug || slugify(data.title),
      trending: values.trending,
      rating: values.rating ?? 4.8,
      reviewCount: values.reviewCount ?? 0,
      whatYouWillLearn: learningPoints.filter(Boolean),
      curriculum: values.curriculum ?? [],
      instructor: values.instructor ?? {
        name: 'To be assigned',
        title: 'Edutech Skills Mentor',
        bio: '',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
      },
    };

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateCourse(id, payload);
        toast.success('Course updated');
      } else {
        await createCourse(payload);
        toast.success('Course created');
      }
      navigate('/admin/courses');
    } catch (error) {
      toast.error(error.message || 'Failed to save course');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size={26} className="text-primary-500" />
      </div>
    );
  }

  return (
    <>
      <SEO title={isEditMode ? 'Edit Course' : 'Add Course'} description="Manage course catalog entries." />
      <Link to="/admin/courses" className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft size={15} /> Back to courses
      </Link>
      <h1 className="text-2xl font-semibold text-ink">{isEditMode ? 'Edit Course' : 'Add New Course'}</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-3xl space-y-8">
        <section className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Basic Details</h2>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="title" required>
                Course title
              </Label>
              <Input id="title" value={values.title} onChange={(e) => updateField('title', e.target.value)} error={errors.title} />
              <FieldError>{errors.title}</FieldError>
            </div>

            <div>
              <Label htmlFor="category" required>
                Category
              </Label>
              <Select id="category" value={values.category} onChange={(e) => updateField('category', e.target.value)}>
                {DOMAINS.map((domain) => (
                  <option key={domain.id} value={domain.name}>
                    {domain.name}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="level" required>
                Level
              </Label>
              <Select id="level" value={values.level} onChange={(e) => updateField('level', e.target.value)}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="format" required>
                Format
              </Label>
              <Select id="format" value={values.format} onChange={(e) => updateField('format', e.target.value)}>
                <option>Program</option>
                <option>Live + Recorded</option>
                <option>Self-Paced</option>
              </Select>
            </div>

            <div>
              <Label htmlFor="duration" required>
                Duration
              </Label>
              <Input
                id="duration"
                placeholder="e.g. 24 Hours"
                value={values.duration}
                onChange={(e) => updateField('duration', e.target.value)}
                error={errors.duration}
              />
              <FieldError>{errors.duration}</FieldError>
            </div>

            <div>
              <Label htmlFor="logo">Icon (emoji)</Label>
              <Input id="logo" value={values.logo} onChange={(e) => updateField('logo', e.target.value)} error={errors.logo} />
              <FieldError>{errors.logo}</FieldError>
            </div>

            <div>
              <Label htmlFor="heroImage" required>
                Cover image URL
              </Label>
              <Input
                id="heroImage"
                placeholder="https://..."
                value={values.heroImage}
                onChange={(e) => updateField('heroImage', e.target.value)}
                error={errors.heroImage}
              />
              <FieldError>{errors.heroImage}</FieldError>
            </div>

            <label className="flex items-center gap-2.5 pt-6 text-sm text-ink-muted">
              <input
                type="checkbox"
                checked={values.trending}
                onChange={(e) => updateField('trending', e.target.checked)}
                className="h-4 w-4 rounded border-ink/20 text-primary-600 focus:ring-primary-200"
              />
              Feature on homepage (Trending)
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Pricing (INR)</h2>
          <p className="mt-1 text-xs text-ink-soft">
            Stored in INR. USD/GBP prices are derived automatically on the storefront using live FX rates.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="priceINR" required>
                Sale price (₹)
              </Label>
              <Input
                id="priceINR"
                type="number"
                min="0"
                value={values.priceINR}
                onChange={(e) => updateField('priceINR', e.target.value)}
                error={errors.priceINR}
              />
              <FieldError>{errors.priceINR}</FieldError>
            </div>
            <div>
              <Label htmlFor="originalPriceINR" required>
                Original price (₹)
              </Label>
              <Input
                id="originalPriceINR"
                type="number"
                min="0"
                value={values.originalPriceINR}
                onChange={(e) => updateField('originalPriceINR', e.target.value)}
                error={errors.originalPriceINR}
              />
              <FieldError>{errors.originalPriceINR}</FieldError>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Descriptions</h2>
          <div className="mt-5 space-y-4">
            <div>
              <Label htmlFor="shortDescription" required>
                Short description
              </Label>
              <Textarea
                id="shortDescription"
                rows={2}
                value={values.shortDescription}
                onChange={(e) => updateField('shortDescription', e.target.value)}
                error={errors.shortDescription}
              />
              <FieldError>{errors.shortDescription}</FieldError>
            </div>
            <div>
              <Label htmlFor="longDescription" required>
                Full description
              </Label>
              <Textarea
                id="longDescription"
                rows={4}
                value={values.longDescription}
                onChange={(e) => updateField('longDescription', e.target.value)}
                error={errors.longDescription}
              />
              <FieldError>{errors.longDescription}</FieldError>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-ink/[0.06] bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">What You'll Learn</h2>
            <button type="button" onClick={addLearningPoint} className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700">
              <Plus size={13} /> Add point
            </button>
          </div>
          <div className="mt-4 space-y-2.5">
            {learningPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={point}
                  onChange={(e) => updateLearningPoint(index, e.target.value)}
                  placeholder="e.g. Build and deploy a CI/CD pipeline"
                />
                {learningPoints.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLearningPoint(index)}
                    aria-label="Remove point"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-soft hover:bg-surface-alt hover:text-accent-600"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end gap-3">
          <Button to="/admin/courses" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="accent" disabled={isSubmitting}>
            {isSubmitting ? <Spinner size={18} /> : isEditMode ? 'Save Changes' : 'Create Course'}
          </Button>
        </div>
      </form>
    </>
  );
}
