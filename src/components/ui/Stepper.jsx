import { Car, User, FileText, DollarSign } from "lucide-react";

const steps = [
  { id: 1, label: "Vehículo",            icon: Car         },
  { id: 2, label: "Infractor",           icon: User        },
  { id: 3, label: "Infracción",          icon: FileText    },
  { id: 4, label: "Descuento & Estado",  icon: DollarSign  },
];

export default function Stepper({ step }) {
  return (
    <nav className="mb-8 w-full">
      <ul className="flex justify-between w-full">
        {steps.map((s) => {
          const visited = s.id <= step;
          return (
            <li key={s.id} className="flex items-center gap-2">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors
                  ${visited ? "bg-primary-600 border-primary-600 text-white" : "bg-white border-gray-300 text-gray-400"}`}
              >
                <s.icon className="h-5 w-5" />
              </span>
              <span
                className={`text-base font-medium transition-colors ${visited ? "text-primary-600" : "text-gray-500"}`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
