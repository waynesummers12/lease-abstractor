import Link from "next/link";

export default function MedicalOfficeCAM() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <h1 className="text-4xl font-bold">
        Medical Office CAM Reconciliation Explained
      </h1>

      <p className="text-gray-700">
        CAM reconciliations in outpatient buildings include specialized systems
        rarely seen in standard office.
      </p>

      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Shared lobby staffing allocations</li>
        <li>Parking structure maintenance</li>
        <li>Elevator servicing contracts</li>
        <li>HVAC load balancing for imaging equipment</li>
        <li>Generator testing and fuel reserves</li>
      </ul>

      <div className="space-x-4">
        <Link href="/medical-office-lease-audit" className="text-blue-600 underline">
          Medical Lease Audit Hub
        </Link>
        <Link href="/cam-reconciliation" className="text-blue-600 underline">
          Core CAM Reconciliation Guide
        </Link>
      </div>
    </main>
  );
}