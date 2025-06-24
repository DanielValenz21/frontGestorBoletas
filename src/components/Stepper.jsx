import {
  Car,
  User,
  FileText,
  DollarSign,
} from "lucide-react";

/**
 * steps = ["Vehículo", "Infractor", "Infracción", "Descuento & Estado"]
 * currentStep = 0-3  (index)
 */
export default function Stepper({ currentStep }) {
  const items = [
    { icon: Car, label: "Vehículo" },
    { icon: User, label: "Infractor" },
    { icon: FileText, label: "Infracción" },
    { icon: DollarSign, label: "Descuento & Estado" },
  ];

  return (
    <nav className="mb-8">
      <ul className="flex w-full justify-between">
        {items.map((item, idx) => {
          const active = idx <= currentStep;
          return (
            <li key={item.label} className="flex flex-col items-center gap-1">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-white
                ${active ? "bg-primary-600" : "border-2 border-gray-300 bg-white text-gray-500"}`
                }
              >
                <item.icon className="h-5 w-5" />
              </span>
              <span
                className={`text-sm ${active ? "text-primary-700" : "text-gray-500"}`}
              >
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
