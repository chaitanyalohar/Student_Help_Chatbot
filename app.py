
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def chatbot_response(message):
    msg = message.lower().strip()

    if "hello" in msg or "hi" in msg:
        return """WELCOME TO STUDENT HELP CHATBOT!

I can help you with:
1. Python Programming
2. Java Programming
3. C++ Programming
4. Computer Basics
5. Exam Preparation
6. College Projects

What would you like to learn today?"""

    elif "python" in msg:
        return """PYTHON PROGRAMMING

Definition:
Python is a high-level programming language.

Important Points:
1. Easy to learn and understand.
2. Supports object-oriented programming.
3. Used in AI, Data Science and Web Development.

Example:
print("Hello World")

Remember: Python uses indentation."""

    elif "java" in msg:
        return """JAVA PROGRAMMING

Definition:
Java is an object-oriented programming language.

Important Points:
1. Java is platform independent.
2. It uses JVM to run bytecode.
3. It supports inheritance and polymorphism.

Example:
System.out.println("Hello World");"""

    elif "c++" in msg or "cpp" in msg:
        return """C++ PROGRAMMING

Definition:
C++ is a general-purpose programming language.

Important Points:
1. Supports object-oriented programming.
2. Supports classes and objects.
3. Used in software and game development.

Example:
cout << "Hello World";"""

    elif "computer" in msg:
        return """COMPUTER BASICS

A computer is an electronic device.

Main Components:
1. CPU - Processes instructions.
2. RAM - Temporary memory.
3. Keyboard - Input device.
4. Monitor - Output device.

CPU is known as the brain of the computer."""

    elif "exam" in msg or "study" in msg:
        return """EXAM PREPARATION TIPS

1. Complete your syllabus.
2. Prepare short notes.
3. Practise previous question papers.
4. Revise important topics.
5. Practise MCQ questions regularly.

Best of luck for your exams!"""

    elif "project" in msg:
        return """PROJECT HELP

I can help you with:

1. Project objectives.
2. Project scope.
3. System requirements.
4. Python and Java coding.
5. Project documentation.
6. Viva questions and answers.

Tell me your project topic."""

    elif "thank" in msg:
        return "You're welcome! Keep learning and practising."

    else:
        return """I am your Student Help Assistant.

Please ask questions about:
Python, Java, C++, Computer Basics,
Exam Preparation or College Projects."""

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    if not isinstance(message, str) or not message.strip():
        return jsonify({"reply": "Please enter a question."}), 400

    answer = chatbot_response(message)

    return jsonify({"reply": answer})

if __name__ == "__main__":
    app.run(debug=True)
