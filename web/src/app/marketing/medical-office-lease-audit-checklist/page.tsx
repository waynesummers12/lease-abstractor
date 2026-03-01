export default function MedicalChecklist() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-10">
      <h1 className="text-4xl font-bold">
        Medical Office Lease Audit Checklist
      </h1>

      <ul className="list-disc pl-6 space-y-2 text-gray-700">
        <li>Confirm CAM admin fee cap</li>
        <li>Review capital expense exclusions</li>
        <li>Verify HVAC allocation methodology</li>
        <li>Inspect generator maintenance charges</li>
        <li>Check reserve fund transparency</li>
      </ul>
    </main>
  );
}