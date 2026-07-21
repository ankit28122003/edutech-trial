import { NavLink, Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Settings, LogOut, GraduationCap, ExternalLink } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { cn } from '../../../lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Courses', to: '/admin/courses', icon: BookOpen },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-surface-alt">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-ink/[0.06] bg-white lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-ink/[0.06] px-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-white">
            <GraduationCap size={16} />
          </span>
          <span className="font-display text-sm font-semibold text-ink">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-6">
          {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-ink-muted hover:bg-surface-alt hover:text-ink'
                )
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-ink/[0.06] p-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface-alt hover:text-ink"
          >
            <ExternalLink size={17} />
            View site
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-surface-alt hover:text-ink"
          >
            <LogOut size={17} />
            Log out
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-ink/[0.06] bg-white px-4 lg:px-8">
          <p className="text-sm font-medium text-ink lg:hidden">Admin Panel</p>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-ink">{user?.name}</p>
              <p className="text-xs text-ink-soft">Administrator</p>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
