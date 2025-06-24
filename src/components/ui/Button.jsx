export default function Button({ children, className="", ...props }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
