export function Card({ children, className="" }) {
  return <div className={`bg-white shadow rounded-lg ${className}`}>{children}</div>;
}

export function CardHeader({ children, className="" }) {
  return <div className={`px-6 py-4 border-b ${className}`}>{children}</div>;
}

export function CardContent({ children, className="" }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className="" }) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
}

export function CardDescription({ children, className="" }) {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
}
