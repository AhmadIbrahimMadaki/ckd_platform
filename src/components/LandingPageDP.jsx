export default function LandingPageDP() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-900 text-white px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        RISK PREDICTION SYSTEM <br /> FOR PATIENT DIAGNOSIS
      </h1>

      <p className="max-w-xl text-center text-sm md:text-base leading-relaxed mb-8">
        This system helps assess patient risk levels based on clinical data.
        It can support diagnosis, monitoring, and patient management.
      </p>

      <button
        onClick={() => (window.location.href = "/DPAssessment")}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Start Assessment
      </button>

      <button className="mt-6 underline text-sm hover:text-gray-300">
        Contact us
      </button>
    </div>
  );
}
