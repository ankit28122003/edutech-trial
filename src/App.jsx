import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './features/admin/components/AdminLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import PageLoader from './components/common/PageLoader';

// Public pages are code-split so the initial bundle only ships Home + layout chrome.
const Home = lazy(() => import('./features/home/HomePage'));
const CourseListing = lazy(() => import('./features/courses/CourseListingPage'));
const CourseDetail = lazy(() => import('./features/course-detail/CourseDetailPage'));
const Login = lazy(() => import('./features/auth/LoginPage'));
const Register = lazy(() => import('./features/auth/RegisterPage'));
const About = lazy(() => import('./features/static/AboutPage'));
const Careers = lazy(() => import('./features/static/CareersPage'));
const Contact = lazy(() => import('./features/static/ContactPage'));
const Blog = lazy(() => import('./features/static/BlogPage'));
const BlogPost = lazy(() => import('./features/static/BlogPostPage'));
const FAQ = lazy(() => import('./features/static/FAQPage'));
const Terms = lazy(() => import('./features/static/TermsPage'));
const Privacy = lazy(() => import('./features/static/PrivacyPage'));
const BecomeInstructor = lazy(() => import('./features/static/BecomeInstructorPage'));
const Affiliate = lazy(() => import('./features/static/AffiliatePage'));
const HelpCenter = lazy(() => import('./features/static/HelpCenterPage'));
const NotFound = lazy(() => import('./features/static/NotFoundPage'));

const AdminDashboard = lazy(() => import('./features/admin/pages/DashboardPage'));
const AdminCourses = lazy(() => import('./features/admin/pages/CoursesPage'));
const AdminCourseForm = lazy(() => import('./features/admin/pages/CourseFormPage'));
const AdminSettings = lazy(() => import('./features/admin/pages/SettingsPage'));

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseListing />} />
          <Route path="/course/:slug" element={<CourseDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/blog" element={<Blog />} /> */}
          {/* <Route path="/blog/:slug" element={<BlogPost />} /> */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/become-an-instructor" element={<BecomeInstructor />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/support" element={<HelpCenter />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/new" element={<AdminCourseForm />} />
          <Route path="courses/:id/edit" element={<AdminCourseForm />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
