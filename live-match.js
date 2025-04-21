/* ------------ القائمة المنسدلة (⚙) ------------ */
function toggleMenu() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = (menu.style.display === "block") ? "none" : "block";
}

function toggleSub(id) {
  const allSubMenus = document.querySelectorAll('.sub-options');
  allSubMenus.forEach(menu => {
    menu.style.display = (menu.id === id && menu.style.display !== "block") ? "block" : "none";
  });
}

// إغلاق القائمة إذا ضغط المستخدم خارجها
window.addEventListener('click', function (event) {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown.contains(event.target)) {
    document.getElementById("dropdownMenu").style.display = "none";
    document.querySelectorAll('.sub-options').forEach(menu => {
      menu.style.display = "none";
    });
  }
});

/* ------------ تسجيل الصوت (بب) ------------ */
document.getElementById("recordIcon").addEventListener("click", function () {
  const mic = this;
  mic.classList.toggle("pulse");

  // تشغيل صوت تنبيه
  const beep = document.getElementById("beep-sound");
  beep.currentTime = 0;
  beep.play();
});

/* ------------ زر تشغيل صوت المعلق ------------ */
document.querySelectorAll('.play-button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.add('pulsing');
    setTimeout(() => {
      button.classList.remove('pulsing');
    }, 1000);
  });
});

/* ------------ عداد النتيجة المتحرك ------------ */
function animateScore(id, target, duration = 1500) {
  const element = document.getElementById(id);
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    element.textContent = value;

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

window.addEventListener('DOMContentLoaded', () => {
  animateScore('score1', 2); // الهلال
  animateScore('score2', 1); // النصر
});

/* ------------ نظام الذكاء لتحليل الاستفسارات ------------ */
function analyzeInput() {
  const input = document.getElementById("userInput").value.toLowerCase();
  const result = document.getElementById("predictionResult");

  const teams = [ /* ... الفرق ... */ ];
  const players = [ /* ... اللاعبين ... */ ];

  const lastMatch = {
    الاتحاد: { ضد: "الأهلي", التاريخ: "3 أبريل 2025", النتيجة: "2-1 للاتحاد" },
    الهلال: { ضد: "النصر", التاريخ: "1 أبريل 2025", النتيجة: "3-1 للهلال" }
  };

  const scorers = {
    الاتحاد: "فهد المولد في الدقيقة 78",
    الهلال: "سالم الدوسري في الدقيقة 30"
  };

  const bench = {
    الاتحاد: ["محمد العويس", "نواف العابد", "عبدالإله المالكي"],
    الهلال: ["عبدالله المعيوف", "محمد كنو", "سعود عبد الحميد"]
  };

  let prediction = "";
  let team = teams.find(t => input.includes(t));
  let player = players.find(p => input.includes(p));

  // الإجابات الجاهزة
  if (input.includes("من فاز") || input.includes("اللي فاز")) {
    prediction = "الهلال فاز 2-1 على النصر.";
  } else if (input.includes("من سجل") || input.includes("مين سجل")) {
    prediction = "سالم الدوسري سجل للهلال، وكريستانو سجل للنصر ⚽.";
  } else if (input.includes("كم النتيجة") || input.includes("نتيجة المباراة")) {
    prediction = "النتيجة 2-1 لصالح الهلال.";
  } else if (input.includes("في الاحتياط") || input.includes("من الاحتياط")) {
    prediction = "في الاحتياط: محمد العويس، نواف العابد ";
  } else {
    const mentionedTeam = Object.keys(lastMatch).find(team => input.includes(team) && input.includes("آخر مباراة"));
    if (mentionedTeam) {
      const match = lastMatch[mentionedTeam];
      prediction = `${mentionedTeam} لعب ضد ${match.ضد} يوم ${match.تاريخ} والنتيجة ${match.النتيجة}.`;
    }
  }

  // تحليل الأداء
  if (prediction === "") {
    if (team) prediction += `تحليل <strong>${team}</strong>: `;

    if (input.includes("إصابات") || input.includes("غيابات") || input.includes("موقوفين")) {
      prediction += "فيه غيابات مؤثرة، النتيجة بتكون صعبة 😕. ";
    }
    if (input.includes("ما فيه إصابات") || input.includes("كامل") || input.includes("جاهز")) {
      prediction += "التشكيلة مكتملة، الوضع مطمئن 💪. ";
    }
    if (input.includes("ضعيف") || input.includes("تعبان")) {
      prediction += " المستوى منخفض، صعب يحقق نتيجة. ";
    }
    if (input.includes("قوي") || input.includes("ممتاز") || input.includes("ينافس")) {
      prediction += " الفريق في فورمة عالية، مرشح قوي للفوز 🏆. ";
    }
    if (input.includes("هبوط")) {
      prediction += " الضغط كبير عليهم، ممكن يخسرون. ";
    }
    if (input.includes("فاز")) {
      prediction += " جاي من فوز، معنوياتهم عالية 🔥. ";
    }
    if (input.includes("خسر")) {
      prediction += " جاي من خسارة، ممكن يتأثر نفسيًا 😓. ";
    }
    if (input.includes("تعادل")) {
      prediction += " آخر مباراة كانت متقاربة، تعادل يعطيهم دفعة متوسطة ⚖️. ";
    }
    if (input.includes("طرد") || input.includes("بطاقة حمراء")) {
      prediction += " لعبوا ناقص عدد، أثر عليهم بقوة 😖. ";
    }

    if (player) prediction += ` ${player} كان له تأثير كبير في المباراة 🌟. `;

    if (prediction === "") {
      prediction = "مممم ما قدرت أفهم سؤالك، ممكن تعيده بصيغة أوضح؟ 🤔";
    }
  }

  result.innerHTML = prediction;
}

/* ------------ التعليقات النصية ------------ */
document.querySelector('.text-comment-btn').addEventListener('click', () => {
  const box = document.getElementById('text-comment-box');
  box.style.display = (box.style.display === 'none') ? 'block' : 'none';
});

function submitTextComment() {
  const input = document.getElementById('text-comment-input');
  const comment = input.value.trim();

  if (comment) {
    input.value = '';

    const msg = document.createElement('div');
    msg.className = 'comment-sent-msg';
    msg.textContent = ' تم إرسال تعليقك';

    document.getElementById('text-comment-box').appendChild(msg);

    // إزالة الرسالة بعد 3 ثواني
    setTimeout(() => {
      msg.classList.add('fade-out');
      setTimeout(() => msg.remove(), 400);
    }, 2000);
  }
}

/* ------------ تعليقات المشاهدين (تشات) ------------ */
function sendComment() {
  const input = document.getElementById('chat-input');
  const chatBox = document.getElementById('chat-box');

  if (input.value.trim() !== '') {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = input.value;

    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;

    const beep = new Audio('https://www.soundjay.com/buttons/sounds/button-3.mp3');
    beep.play();

    input.value = '';
  }
}
