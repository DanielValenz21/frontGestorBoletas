import { Car, User, FileText, DollarSign } from "lucide-react";

const steps = [
  { id: 1, label: "Vehículo",            icon: Car         },
  { id: 2, label: "Infractor",           icon: User        },
  { id: 3, label: "Infracción",          icon: FileText    },
  { id: 4, label: "Descuento & Estado",  icon: DollarSign  },
];

export default function Stepper({ step }) {
  return (
    <div className="flex justify-center gap-24 lg:gap-28 mb-10">
      {steps.map((s) => {
        const visited = s.id <= step;
        return (
          <div key={s.id} className="flex flex-col items-center">
            <div
              className={`w-11 h-11 flex items-center justify-center rounded-full border
                ${
                  visited
                    ? "bg-primary-600 border-primary-600 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-500"
                }`}
            >
              <s.icon className="w-5 h-5" />
            </div>
            <p
              className={`mt-2 text-sm ${
                visited ? "text-primary-600 font-medium" : "text-gray-500"
              }`}
            >
              {s.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
