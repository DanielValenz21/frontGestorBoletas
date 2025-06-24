export default function Select({ label, options = [], value, onChange }) {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
      >
        <option value="">Seleccionar…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
