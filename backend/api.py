from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq

app = Flask(__name__)
CORS(app)

GROQ_API_KEY = "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"
client = Groq(api_key=GROQ_API_KEY)

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.json
    job_title = data.get("jobTitle", "")
    company_name = data.get("companyName", "")
    experience_level = data.get("experienceLevel", "")
    location = data.get("location", "Remote")
    company_description = data.get("companyDescription", "")
    salary_range = data.get("salaryRange", "")

    if not all([job_title, company_name, experience_level, company_description]):
        return jsonify({"error": "Missing required fields"}), 400

    prompt = f"""You are an expert HR professional. Create a detailed, professional job posting.

JOB TITLE: {job_title}
COMPANY: {company_name}
EXPERIENCE LEVEL: {experience_level}
LOCATION: {location}
COMPANY DESCRIPTION: {company_description}
{f"SALARY RANGE: {salary_range}" if salary_range else ""}

Create an engaging job posting with these sections:

# {job_title}

**Company:** {company_name}
**Location:** {location}
**Employment Type:** Full-time
**Experience Level:** {experience_level}
{f"**Salary Range:** {salary_range}" if salary_range else ""}

## About Us
{company_description}

## The Opportunity
Write 2-3 exciting sentences about why this role matters and the impact the candidate will make.

## Key Responsibilities
- (Write 6 specific, actionable responsibilities starting with action verbs)

## Requirements
### Required Qualifications
- (Write 6 requirements including {experience_level} level experience)
- Include technical skills, soft skills, and education

### Nice to Have
- (Write 2-3 preferred qualifications)

## What We Offer
- Competitive salary based on experience
- Comprehensive health, dental, and vision benefits
- {location} work flexibility
- Professional development budget
- Paid time off and holidays
- (Add 2 more relevant benefits)

## How to Apply
Please submit your resume and a brief cover letter explaining why you are interested in this role.

## Equal Opportunity Statement
We are an equal opportunity employer. We celebrate diversity and are committed to creating an inclusive environment for all employees.

Make it professional, inclusive, and ready to post immediately."""

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are an expert HR professional who writes excellent, detailed, bias-free job postings.",
                },
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
        )
        result = response.choices[0].message.content
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
