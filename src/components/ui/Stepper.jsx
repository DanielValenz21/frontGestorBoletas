import { Car, User, FileText, DollarSign } from "lucide-react";

const steps = [
  { id: 1, label: "Vehículo",            icon: Car         },
  { id: 2, label: "Infractor",           icon: User        },
  { id: 3, label: "Infracción",          icon: FileText    },
  { id: 4, label: "Descuento & Estado",  icon: DollarSign  },
];

export default function Stepper({ step }) {
  return (
    <div className="flex justify-center gap-24 lg:gap-28 mb-10"> {/* ↔ separación mayor */}
      {steps.map((s) => {
        const active = step === s.id;
        return (
          <div key={s.id} className="flex flex-col items-center">
            <div
              className={`w-11 h-11 flex items-center justify-center rounded-full
                ${active ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-500"}`}
            >
              <s.icon className="w-5 h-5" />
            </div>
            <p className={`mt-2 text-sm ${active ? "text-primary-600 font-medium" : "text-gray-500"}`}>
              {s.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}
