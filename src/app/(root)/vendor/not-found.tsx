import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] bg-gray-100 dark:bg-gray-900 text-center px-4">
      <div className="max-w-md space-y-4">
        <h1 className="text-8xl font-bold text-gray-900 dark:text-gray-50">
          404
        </h1>
        <p className="text-2xl font-medium text-gray-600 dark:text-gray-400">
          Oops, the page you&lsquot;re looking for doesn&lsquot;t exist.
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-medium text-gray-50 shadow-sm transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
          href="/"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
