import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const questions = [
  {
    category: "Diet and Nutrition",
    items: [
      {
        question: "How often do you consume high-sodium foods (e.g., processed foods, canned soups, salty snacks)?",
        options: ["Never", "Occasionally", "Frequently"],
        scores: [0, 1, 2],
      },
      {
        question: "How often do you consume high-protein foods (e.g., red meat, poultry, fish, dairy products)?",
        options: ["Rarely", "Occasionally", "Frequently"],
        scores: [0, 1, 2],
      },
      {
        question: "How many glasses of water do you drink per day?",
        options: ["More than 6 glasses", "4-6 glasses", "Less than 4 glasses"],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    category: "Physical Activity",
    items: [
      {
        question: "How many days per week do you engage in physical activity (e.g., walking, running, exercise)?",
        options: ["4 or more days", "2-3 days", "0-1 days"],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    category: "Smoking and Alcohol Consumption",
    items: [
      {
        question: "Do you currently smoke or have you ever smoked?",
        options: ["No", "Yes, occasionally", "Yes, regularly"],
        scores: [0, 1, 2],
      },
      {
        question: "How often do you consume alcoholic drinks (e.g., wine, beer, spirits)?",
        options: ["Never", "Occasionally (1-2 times a week)", "Regularly (3 or more times a week)"],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    category: "Obesity and Weight Management",
    items: [
      {
        question: "Would you consider yourself overweight or obese based on your body mass index (BMI)?",
        options: ["No", "Yes, slightly overweight", "Yes, obese"],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    category: "Health Conditions",
    items: [
      {
        question: "Do you have a history of hypertension (high blood pressure) or have you ever been diagnosed with high blood pressure?",
        options: ["No", "Yes, controlled with medication", "Yes, not controlled"],
        scores: [0, 1, 2],
      },
      {
        question: "Do you have diabetes or have you ever been diagnosed with high blood sugar?",
        options: ["No", "Yes, controlled with medication", "Yes, not controlled"],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    category: "Herbal Remedies and Medication Adherence",
    items: [
      {
        question: "Do you take herbal remedies or traditional medicines without a prescription?",
        options: ["Yes, regularly", "Yes, occasionally", "No"],
        scores: [2, 1, 0],
      },
      {
        question: "Do you follow the dosage instructions for prescribed medications?",
        options: ["Yes, always", "Sometimes", "Rarely or never"],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    category: "Family History",
    items: [
      {
        question: "Do you have a family history of CKD, hypertension, or diabetes?",
        options: ["No", "Yes, one of these conditions", "Yes, multiple conditions"],
        scores: [0, 1, 2],
      },
    ],
  },
  {
    category: "Environmental Factors",
    items: [
      {
        question: "In which state do you currently reside?",
        options: [
          "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River",
          "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
          "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
          "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "Federal Capital Territory (FCT)"
        ],
        scores: [
          0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0
        ],
      },
    ],
  },
];


export default function CKDRiskQuestionnaire() {
  const [answers, setAnswers] = useState({});
  const [riskLevel, setRiskLevel] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (question, index, score) => {
    setAnswers((prev) => ({ ...prev, [question]: score }));
  };

  const calculateRisk = () => {
    const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
    console.log(totalScore);
  
    let risk = "Low Risk";
    if (totalScore >= 18) {
      risk = "High Risk";
      navigate("/patient/assessments"); // Redirect for high risk
    } else if (totalScore >= 10) {
      risk = "Moderate Risk";
      toast.success("You are at moderate risk. Maintain a healthy diet, exercise regularly, and monitor your health closely.");
    } else {
      toast.success("You are at low risk. Keep up your healthy lifestyle and stay hydrated!");
    }
  
    setRiskLevel(risk);
  };
  

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">CKD Risk Lifestyle Questionnaire</h2>
      {questions.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{section.category}</h3>
          {section.items.map((item, index) => (
            <div key={index} className="mb-3">
              <p className="font-medium">{item.question}</p>
              {item.options.map((option, optIndex) => (
                <label key={optIndex} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={item.question}
                    value={item.scores[optIndex]}
                    onChange={() => handleSelect(item.question, optIndex, item.scores[optIndex])}
                    className="mr-2"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button 
        onClick={calculateRisk} 
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Calculate Risk
      </button>
      {riskLevel && (
        <p className="mt-4 text-lg font-bold text-center">
          Your Risk Level: <span className="text-red-500">{riskLevel}</span>
        </p>
      )}
    </div>
  );
}
