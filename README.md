# Uro Diagnostics AI 🔬

A client-side computer vision urine test strip analyzer built for healthcare professionals. Fully operational on static hosts like **GitHub Pages** with zero backend infrastructure.

## 🚀 Live Features
- **Client Authentication:** Mock login guard via `localStorage`.
- **Intake Management:** Local patient metadata recording.
- **AI Strip Scanner:** Image drag-and-drop workflow with synthetic biomarker evaluation.
- **Biomarker Metrics:** Real-time computation for 10 analytes (*Glucose, Protein, Ketones, Blood, Nitrite, Leukocytes, Specific Gravity, pH, Bilirubin, Urobilinogen*).
- **PDF Report Generation:** Direct PDF generation via `jsPDF` and `autoTable`.
- **Records Database:** Queryable client history storage with search and filtering capabilities.
- **Analytics Dashboard:** Chart visualizations powered by `Chart.js`.
- **Design System:** Responsive UI featuring glassmorphism, responsive navigation, and dark mode.

## 🔑 Login Credentials
- **Username:** `doctor`
- **Password:** `123456`

## 🛠️ Stack & Dependencies
- HTML5 / CSS3 (CSS Variables + Glassmorphism)
- Vanilla JavaScript (ES6 Modules/Scripts)
- [Chart.js](https://www.chartjs.org/) (CDN)
- [jsPDF](https://github.com/parallax/jsPDF) + AutoTable Plugin (CDN)

## 📦 GitHub Pages Deployment Instructions
1. Push this repository to GitHub.
2. Go to **Settings** -> **Pages**.
3. Select `main` branch under **Source**.
4. Save and open the generated public URL!