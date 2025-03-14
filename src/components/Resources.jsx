import React from "react";

const Resources = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
                <h1 className="text-3xl font-bold mb-4 text-blue-700">CKD Resources</h1>
                
                {/* Section 1: General Info */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">What is Chronic Kidney Disease (CKD)?</h2>
                    <p>
                        Chronic Kidney Disease (CKD) is a <strong>gradual loss of kidney function</strong> over time.
                        The kidneys filter waste and excess fluids from the blood, and when they stop working properly, 
                        harmful toxins build up in the body. CKD can lead to <strong>serious complications</strong>, including 
                        high blood pressure, anemia, weak bones, and heart disease.
                    </p>
                </section>

                {/* Section 2: Causes & Risk Factors */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Causes & Risk Factors of CKD</h2>
                    <h1 className="text-xl font-semibold mb-2">Common Causes</h1>
                    <ul className="list-disc pl-6">
                        <li><strong>Diabetes (Type 1 & Type 2)</strong> – High blood sugar damages kidney filters.</li>
                        <li><strong>High Blood Pressure</strong> – Puts strain on kidney blood vessels.</li>
                        <li><strong>Glomerulonephritis</strong> – Inflammation of kidney filtering units.</li>
                        <li><strong>Polycystic Kidney Disease (PKD)</strong> – A genetic disorder causing kidney cysts.</li>
                        <li><strong>Long-term Kidney Infections</strong> – Can lead to scarring and reduced function.</li>
                    </ul>
                    <h1 className="text-xl font-semibold mb-2">Risk Factors</h1>
                    <ul className="list-disc pl-6">
                        <li> Family history of kidney disease.</li>
                        <li> Being overweight or obese.</li>
                        <li> Older age (above 60 years).</li>
                        <li> Smoking & excessive alcohol intake.</li>
                        <li> Long-term use of NSAIDs (like ibuprofen).</li>
                    </ul>
                </section>

                {/* Section 3: Stages of CKD */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Stages of CKD & Symptoms</h2>
                    <h1 className="text-xl font-semibold mb-2">Stages of CKD</h1>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border p-2">Stage</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Kidney Function (GFR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">1</td>
                                <td className="border p-2">Kidney damage with normal function</td>
                                <td className="border p-2">90+</td>
                            </tr>
                            <tr>
                                <td className="border p-2">2</td>
                                <td className="border p-2">Mild loss of kidney function</td>
                                <td className="border p-2">60-89</td>
                            </tr>
                            <tr>
                                <td className="border p-2">3a</td>
                                <td className="border p-2">Moderate loss of function</td>
                                <td className="border p-2">45-59</td>
                            </tr>
                            <tr>
                                <td className="border p-2">3b</td>
                                <td className="border p-2">More severe loss</td>
                                <td className="border p-2">30-44</td>
                            </tr>
                            <tr>
                                <td className="border p-2">4</td>
                                <td className="border p-2">Severe kidney function loss</td>
                                <td className="border p-2">15-29</td>
                            </tr>
                            <tr>
                                <td className="border p-2">5</td>
                                <td className="border p-2">Kidney failure (End-stage CKD)</td>
                                <td className="border p-2">&lt;15 (Needs dialysis)</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2 className="text-xl font-semibold mb-2">Symptoms</h2>
                    <ul className="list-disc pl-6">
                        <li> Swelling in legs and feet (fluid retention).</li>
                        <li> Fatigue and weakness.</li>
                        <li> Changes in urination (too much or too little).</li>
                        <li> Shortness of breath.</li>
                        <li> Nausea and vomiting.</li>
                        <li> Dry, itchy skin.</li>
                        <li> Difficulty concentrating.</li>
                    </ul>
                </section>

                {/* Section 4: Lifestyle & Diet */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Lifestyle & Diet Tips</h2>
                    <ul className="list-disc pl-6">
                        <li><strong>Healthy foods:</strong> Chicken, fish, eggs, apples, berries, cabbage.</li>
                        <li><strong>Foods to avoid:</strong> Processed foods, red meat, bananas, dairy, sodas.</li>
                        <li><strong>Exercise regularly:</strong> Aim for 30 minutes of walking or yoga daily.</li>
                    </ul>
                </section>

                {/* Section 5: Treatments & Medications */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Treatment & Medications</h2>
                    <ul className="list-disc pl-6">
                        <li><strong>Dialysis:</strong> Removes waste when kidneys fail.</li>
                        <li><strong>Kidney transplant:</strong> A long-term solution for end-stage CKD.</li>
                        <li><strong>Medications:</strong> Blood pressure control, diuretics, and phosphate binders.</li>
                    </ul>
                </section>

                {/* Section 6: Support & Community */}
                <section className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Support & Community</h2>
                    <ul className="list-disc pl-6">
                        <li><a href="https://www.kidney.org" className="text-blue-600 underline">National Kidney Foundation</a></li>
                        <li><a href="https://www.kidneysupport.org" className="text-blue-600 underline">Online Support Groups</a></li>
                        <li>Consult a doctor for personalized advice.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Resources;
