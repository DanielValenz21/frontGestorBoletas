export default function Textarea({
  label,
  className = "",
  ...props
}) {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={`w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:border-primary-500 focus:ring-primary-500 ${className}`}
      />
    </div>
  );
}
