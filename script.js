// ---------------- CHATBOT ----------------

function showDashboard() {
    hideSections();
    document.getElementById("dashboard").hidden = false;
    setActive(0);
}

function openChat(prompt = "") {
    hideSections();
    document.getElementById("chatSection").hidden = false;
    setActive(1);

    if (prompt) {
        document.getElementById("message").value = prompt;
    }

    document.getElementById("message").focus();
}

function hideSections() {
    document.getElementById("dashboard").hidden = true;
    document.getElementById("chatSection").hidden = true;
    document.getElementById("quizSection").hidden = true;
}

function setActive(index) {
    document.querySelectorAll(".nav-btn").forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
    });
}

function addMessage(text, type) {
    const chatbox = document.getElementById("chatbox");
    const div = document.createElement("div");

    div.className = "message " + type;
    div.textContent = text;

    chatbox.appendChild(div);
    chatbox.scrollTop = chatbox.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("message");
    const button = document.getElementById("sendBtn");
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    button.disabled = true;
    button.textContent = "Wait...";

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        if (!response.ok) throw new Error("Server error");

        addMessage(data.reply, "bot");

    } catch (error) {
        addMessage("Sorry! Something went wrong. Please try again.", "bot");

    } finally {
        button.disabled = false;
        button.textContent = "Send ➤";
        input.focus();
    }
}


// ---------------- QUIZ QUESTIONS ----------------
// Format: [Question, [Options], Correct option index, Explanation]

const quizzes = {
    python: [
        ["Which symbol is used for comments?", ["//", "#", "<!--", "**"], 1, "# starts a Python comment."],
        ["Which function displays output?", ["input()", "print()", "show()", "write()"], 1, "print() displays output."],
        ["Which type stores True or False?", ["int", "str", "bool", "list"], 2, "bool stores True or False."],
        ["Which brackets create a list?", ["()", "{}", "[]", "<>"], 2, "Lists use square brackets."],
        ["Which keyword defines a function?", ["function", "define", "def", "fun"], 2, "def defines a function."],
        ["Which function reads user input?", ["read()", "input()", "scan()", "get()"], 1, "input() reads user input."],
        ["Which operator performs exponentiation?", ["^", "**", "//", "%"], 1, "** raises a number to a power."],
        ["What is len('cat')?", ["2", "3", "4", "Error"], 1, "The word cat has three characters."],
        ["Which collection is immutable?", ["List", "Dictionary", "Set", "Tuple"], 3, "A tuple cannot be changed after creation."],
        ["Which loop iterates over a sequence?", ["repeat", "for", "loop", "iterate"], 1, "for iterates over sequence items."],
        ["Which structure handles exceptions?", ["try-except", "if-else", "for-in", "def-return"], 0, "try-except handles exceptions."],
        ["What is int('5')?", ["'5'", "5.0", "5", "Error"], 2, "int() converts the string to integer 5."],
        ["Which method adds an item to a list?", ["insertEnd()", "append()", "addLast()", "push()"], 1, "append() adds an item at the end."],
        ["What is the first list index?", ["1", "-1", "0", "None"], 2, "Python indexing starts at zero."],
        ["Which keyword imports a module?", ["include", "using", "import", "module"], 2, "import loads a module."],
        ["Which value represents no value?", ["NULL", "None", "void", "empty"], 1, "None represents absence of a value."],
        ["Which operator checks equality?", ["=", "==", "!=", "==="], 1, "== compares two values."],
        ["Which collection stores key-value pairs?", ["List", "Tuple", "Dictionary", "String"], 2, "A dictionary stores key-value pairs."],
        ["What is the Python file extension?", [".java", ".py", ".html", ".cpp"], 1, "Python files use .py."],
        ["What does range(3) produce?", ["1,2,3", "0,1,2", "0,1,2,3", "3"], 1, "range(3) produces 0, 1 and 2."]
    ],

    java: [
        ["Which keyword declares a class?", ["class", "ClassName", "define", "struct"], 0, "class declares a Java class."],
        ["Which method is the entry point?", ["start()", "main()", "run()", "init()"], 1, "main() is the standard entry point."],
        ["What is the Java source extension?", [".class", ".java", ".js", ".jav"], 1, "Java source files use .java."],
        ["Which keyword creates an object?", ["new", "make", "create", "this"], 0, "new creates an object."],
        ["Which type stores whole numbers?", ["double", "char", "int", "boolean"], 2, "int stores integers."],
        ["Which symbol ends most statements?", [":", ";", "!", ","], 1, "A semicolon ends most Java statements."],
        ["Which concept allows class inheritance?", ["Encapsulation", "Inheritance", "Compilation", "Casting"], 1, "Inheritance derives one class from another."],
        ["Which keyword prevents class extension?", ["static", "private", "final", "void"], 2, "A final class cannot be extended."],
        ["Which package is imported automatically?", ["java.util", "java.lang", "java.io", "java.net"], 1, "java.lang is available automatically."],
        ["Which method compares String contents?", ["==", "equals()", "compareValue()", "same()"], 1, "equals() compares String contents."],
        ["Which keyword is used for class inheritance?", ["implements", "extends", "inherits", "superclass"], 1, "extends is used for class inheritance."],
        ["Which type stores one character?", ["String", "char", "character", "byte"], 1, "char stores one character."],
        ["Which loop runs at least once?", ["for", "while", "do-while", "foreach"], 2, "do-while checks the condition after execution."],
        ["Which keyword refers to the current object?", ["super", "this", "self", "current"], 1, "this refers to the current object."],
        ["What does JVM stand for?", ["Java Variable Method", "Java Virtual Machine", "Joint Virtual Memory", "Java Verified Mode"], 1, "JVM runs Java bytecode."],
        ["Which access modifier gives widest access?", ["private", "protected", "public", "default"], 2, "public members have broad access."],
        ["Which interface is commonly used for thread tasks?", ["Runnable", "Serializable", "Readable", "Cloneable"], 0, "Runnable represents a task for a thread."],
        ["Which block handles exceptions?", ["catch", "throw", "final", "import"], 0, "catch handles exceptions."],
        ["Which keyword implements an interface?", ["extends", "implements", "interface", "instanceof"], 1, "A class uses implements."],
        ["Which collection does not allow duplicates?", ["List", "Set", "ArrayList", "Queue"], 1, "A Set stores unique elements."]
    ],

    cpp: [
        ["Which header is used for C++ input/output?", ["<stdio.h>", "<iostream>", "<string.h>", "<math.h>"], 1, "iostream provides cin and cout."],
        ["Which operator sends output to cout?", ["<<", ">>", "&&", "::"], 0, "<< is the insertion operator."],
        ["Which function starts a C++ program?", ["start()", "main()", "run()", "init()"], 1, "Execution starts from main()."],
        ["Which symbol ends a statement?", [":", ";", "!", "."], 1, "A semicolon ends most statements."],
        ["Which keyword declares an integer?", ["integer", "number", "int", "whole"], 2, "int is the integer data type."],
        ["Which object takes input?", ["cout", "cin", "input", "scan"], 1, "cin reads input."],
        ["Which concept combines data and methods?", ["Encapsulation", "Iteration", "Compilation", "Linking"], 0, "Encapsulation groups data and methods."],
        ["Which operator accesses object members?", ["->", ".", "::", "&"], 1, "The dot operator accesses object members."],
        ["Which keyword declares a class?", ["object", "class", "structonly", "define"], 1, "class declares a class."],
        ["Same function name with different parameters?", ["Overloading", "Overriding", "Inheritance", "Casting"], 0, "Function overloading uses different parameters."],
        ["Which loop checks condition before execution?", ["do-while", "while", "Both after", "None"], 1, "while checks before each iteration."],
        ["Which operator gets a variable's address?", ["*", "&", "%", "!"], 1, "& is the address-of operator."],
        ["Which operator accesses members through a pointer?", [".", "->", "::", "&&"], 1, "-> accesses members through a pointer."],
        ["Which keyword allocates dynamic memory?", ["create", "malloc only", "new", "alloc"], 2, "new allocates memory dynamically."],
        ["Which keyword releases memory allocated by new?", ["free", "delete", "remove", "clear"], 1, "delete releases memory allocated by new."],
        ["Which namespace contains cin and cout?", ["std", "main", "system", "cpp"], 0, "cin and cout belong to std."],
        ["What is a constructor?", ["A loop", "A special function called during object creation", "A data type", "A header"], 1, "A constructor initializes an object."],
        ["Which feature derives one class from another?", ["Polymorphism", "Inheritance", "Tokenizing", "Linking"], 1, "Inheritance creates a derived class."],
        ["What is a common C++ source extension?", [".py", ".java", ".cpp", ".html"], 2, "C++ source files commonly use .cpp."],
        ["What does OOP stand for?", ["Object-Oriented Programming", "Open Output Process", "Order Of Program", "Object Operation Protocol"], 0, "OOP means Object-Oriented Programming."]
    ],

    computer: [
        ["What is called the brain of a computer?", ["Monitor", "CPU", "Keyboard", "Mouse"], 1, "CPU processes instructions."],
        ["Which device is used to type text?", ["Monitor", "Printer", "Keyboard", "Speaker"], 2, "Keyboard is an input device."],
        ["Which is an output device?", ["Mouse", "Keyboard", "Scanner", "Monitor"], 3, "Monitor displays output."],
        ["What is the full form of RAM?", ["Read Access Memory", "Random Access Memory", "Run All Memory", "Rapid Active Machine"], 1, "RAM means Random Access Memory."],
        ["Which memory is volatile?", ["ROM", "Hard disk", "RAM", "DVD"], 2, "RAM loses data when power is off."],
        ["What is the full form of CPU?", ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Power Unit"], 0, "CPU means Central Processing Unit."],
        ["Which is an operating system?", ["Windows", "HTML", "Python", "Google"], 0, "Windows is an operating system."],
        ["Which device prints documents?", ["Scanner", "Printer", "Microphone", "Webcam"], 1, "A printer produces paper output."],
        ["What is the full form of USB?", ["Universal Serial Bus", "United System Board", "Universal Storage Box", "User Serial Base"], 0, "USB means Universal Serial Bus."],
        ["Which is a web browser?", ["Linux", "Chrome", "Excel", "PowerPoint"], 1, "Chrome is a web browser."],
        ["What is the smallest unit of data?", ["Byte", "Bit", "Kilobyte", "Megabyte"], 1, "A bit is either 0 or 1."],
        ["How many bits are in one byte?", ["4", "8", "16", "32"], 1, "One byte contains 8 bits."],
        ["Which number system do computers use?", ["Decimal", "Binary", "Roman", "Octal only"], 1, "Computers use binary digits 0 and 1."],
        ["Which is secondary storage?", ["RAM", "Cache", "SSD", "Register"], 2, "SSD stores data without power."],
        ["What does URL stand for?", ["Uniform Resource Locator", "Universal Record Link", "User Reference Location", "Uniform Read Language"], 0, "A URL is a web resource address."],
        ["Which software helps protect against malware?", ["Text editor", "Antivirus", "Calculator", "Compiler"], 1, "Antivirus helps detect malicious software."],
        ["What does LAN stand for?", ["Large Area Network", "Local Area Network", "Linked Access Node", "Long Access Network"], 1, "LAN connects devices in a limited area."],
        ["Which key inserts a blank space?", ["Shift", "Enter", "Spacebar", "Tab"], 2, "Spacebar inserts a blank space."],
        ["Which company develops Windows?", ["Apple", "Microsoft", "IBM", "Intel"], 1, "Microsoft develops Windows."],
        ["What is the purpose of a backup?", ["Delete files", "Make an extra copy of data", "Slow the computer", "Format the screen"], 1, "A backup helps restore data."]
    ]
};


// ---------------- QUIZ FUNCTIONS ----------------

let currentSubject = "";
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function showQuizHome() {
    hideSections();

    document.getElementById("quizSection").hidden = false;
    document.getElementById("quizHome").hidden = false;
    document.getElementById("quizPlay").hidden = true;
    document.getElementById("quizResult").hidden = true;

    setActive(2);
}

function startQuiz(subject) {
    currentSubject = subject;
    currentQuestion = 0;
    score = 0;
    userAnswers = [];

    document.getElementById("quizHome").hidden = true;
    document.getElementById("quizPlay").hidden = false;
    document.getElementById("quizResult").hidden = true;

    const names = {
        python: "Python Quiz",
        java: "Java Quiz",
        cpp: "C++ Quiz",
        computer: "Computer Basics Quiz"
    };

    document.getElementById("quizSubject").textContent = names[subject];

    showQuestion();
}

function showQuestion() {
    const q = quizzes[currentSubject][currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1} of 20`;

    document.getElementById("scoreLive").textContent =
        `Score: ${score}`;

    document.getElementById("questionText").textContent = q[0];

    document.getElementById("progressFill").style.width =
        ((currentQuestion + 1) / 20 * 100) + "%";

    document.getElementById("feedback").textContent = "";

    const optionsBox = document.getElementById("options");
    optionsBox.innerHTML = "";

    document.getElementById("nextBtn").disabled = true;

    document.getElementById("nextBtn").textContent =
        currentQuestion === 19 ? "See Result →" : "Next Question →";

    q[1].forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "option-btn";
        button.textContent =
            String.fromCharCode(65 + index) + ". " + option;

        button.onclick = () => selectAnswer(index);

        optionsBox.appendChild(button);
    });
}

function selectAnswer(index) {
    const q = quizzes[currentSubject][currentQuestion];

    const buttons = document.querySelectorAll(".option-btn");

    if ([...buttons].some(button => button.disabled)) {
        return;
    }

    const correct = index === q[2];

    if (correct) {
        score++;
    }

    userAnswers.push(index);

    buttons.forEach((button, i) => {
        button.disabled = true;

        if (i === q[2]) {
            button.classList.add("correct");
        } else if (i === index) {
            button.classList.add("wrong");
        }
    });

    document.getElementById("feedback").textContent =
        (correct ? "Correct! " : "Incorrect. ") + q[3];

    document.getElementById("scoreLive").textContent =
        "Score: " + score;

    document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
    if (currentQuestion < 19) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quizPlay").hidden = true;
    document.getElementById("quizResult").hidden = false;

    document.getElementById("finalScore").textContent =
        score + " / 20";

    document.getElementById("resultTitle").textContent =
        score >= 16 ? "Excellent Work!" :
        score >= 10 ? "Good Effort!" :
        "Keep Practising!";

    document.getElementById("resultMessage").textContent =
        `You answered ${score} out of 20 questions correctly.`;

    const review = document.getElementById("answerReview");
    review.innerHTML = "<h3>Answer Review</h3>";

    quizzes[currentSubject].forEach((q, i) => {
        const item = document.createElement("div");
        item.className = "review-item";

        item.innerHTML = `
            <b>${i + 1}. ${escapeText(q[0])}</b><br>
            Your Answer: ${escapeText(q[1][userAnswers[i]])}<br>
            Correct Answer: ${escapeText(q[1][q[2]])}<br>
            Explanation: ${escapeText(q[3])}
        `;

        review.appendChild(item);
    });
}

function escapeText(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[c];
    });
}

function retryQuiz() {
    startQuiz(currentSubject);
}


// ---------------- ENTER KEY ----------------

document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("message");

    if (input) {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
});