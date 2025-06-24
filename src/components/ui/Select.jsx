export default function Select({ label, options=[], value, onChange }) {
  return (
    <div>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}
      <select
        className="w-full rounded-md border-gray-300 px-3 py-2 text-sm"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
      >
        <option value="">Seleccionar…</option>
        {options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
