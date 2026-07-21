import Spinner from '../ui/Spinner';

export default function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner size={28} className="text-primary-500" />
    </div>
  );
}
