import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import SEO from '../../components/common/SEO';
import AuthLayout from './AuthLayout';
import { Label, Input, FieldError } from '../../components/ui/FormField';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import { useAuth } from '../../context/AuthContext';
import { registerSchema, getFieldErrors } from '../../lib/validation';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { errors: fieldErrors, data } = getFieldErrors(registerSchema, values);
    setErrors(fieldErrors || {});
    if (fieldErrors) return;

    setIsSubmitting(true);
    try {
      const user = await register(data);
      toast.success(`Welcome to Edutech Skills, ${user.name}!`);
      navigate('/', { replace: true });
    } catch (error) {
      toast.error(error.message || 'Unable to create your account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SEO title="Create Account" description="Create your Edutech Skills account." canonicalPath="/register" />
      <AuthLayout title="Create your account" subtitle="Start your first course in minutes.">
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <Label htmlFor="name" required>
              Full name
            </Label>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Jordan Rivera"
              value={values.name}
              onChange={(e) => updateField('name', e.target.value)}
              error={errors.name}
            />
            <FieldError>{errors.name}</FieldError>
          </div>

          <div>
            <Label htmlFor="email" required>
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(e) => updateField('email', e.target.value)}
              error={errors.email}
            />
            <FieldError>{errors.email}</FieldError>
          </div>

          <div>
            <Label htmlFor="password" required>
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={values.password}
              onChange={(e) => updateField('password', e.target.value)}
              error={errors.password}
            />
            <FieldError>{errors.password}</FieldError>
          </div>

          <div>
            <Label htmlFor="confirmPassword" required>
              Confirm password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              value={values.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
            />
            <FieldError>{errors.confirmPassword}</FieldError>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
            {isSubmitting ? <Spinner size={18} /> : 'Create Account'}
          </Button>

          <p className="text-center text-sm text-ink-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
              Log in
            </Link>
          </p>
        </form>
      </AuthLayout>
    </>
  );
}
