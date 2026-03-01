export default function CAMSpikesMedical() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <h1 className="text-4xl font-bold">
        CAM Spikes in Medical Buildings
      </h1>

      <p className="text-gray-700">
        Medical CAM costs have risen sharply due to insurance increases,
        compliance upgrades, and capital improvements.
      </p>

      <table className="w-full border border-gray-300 text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Year</th>
            <th className="p-3">CAM PSF</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">Year 1</td>
            <td className="p-3">$7.00</td>
          </tr>
          <tr>
            <td className="p-3">Year 3</td>
            <td className="p-3">$12.00</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}