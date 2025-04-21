// عند تحميل الصفحة، نحاول استرجاع بيانات المستخدم من localStorage وعرضها
window.onload = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    // عرض البيانات في الصفحة
    document.getElementById("name").innerText = userData.name || "أحمد التعييبي";
    document.getElementById("email").innerText = userData.email || "ahmed@example.com";
    document.getElementById("city").innerText = userData.city || "الرياض";
    document.getElementById("gender").innerText = userData.gender || "ذكر";
    document.getElementById("age").innerText = userData.age ? userData.age + " سنة" : "28 سنة";
  }
};

// فتح نموذج تعديل البيانات وتعبئة الحقول الحالية فيه
function openEditForm() {
  const userData = JSON.parse(localStorage.getItem("userData"));

  document.getElementById("editName").value = userData?.name || "";
  document.getElementById("editEmail").value = userData?.email || "";
  document.getElementById("editCity").value = userData?.city || "";
  document.getElementById("editGender").value = userData?.gender || "";
  document.getElementById("editAge").value = userData?.age || "";

  document.getElementById("editForm").style.display = "block";
}

// إغلاق نموذج التعديل
function closeEditForm() {
  document.getElementById("editForm").style.display = "none";
}

// حفظ التعديلات في localStorage وتحديث الصفحة
function saveEdits() {
  const updatedData = {
    name: document.getElementById("editName").value,
    email: document.getElementById("editEmail").value,
    city: document.getElementById("editCity").value,
    gender: document.getElementById("editGender").value,
    age: document.getElementById("editAge").value,
  };

  localStorage.setItem("userData", JSON.stringify(updatedData));
  location.reload(); // إعادة تحميل الصفحة لعرض التعديلات
}

// تسجيل الخروج بحذف البيانات والتوجيه لصفحة تسجيل الدخول
function confirmLogout() {
  const confirmed = confirm("هل أنت متأكد أنك تريد تسجيل الخروج؟");
  if (confirmed) {
    localStorage.removeItem("userData");
    window.location.href = "login.html";
  }
}
function likeShot(button) {
  button.classList.toggle("liked");
  const likesSpan = button.nextElementSibling;
  let currentLikes = parseInt(likesSpan.textContent);
  if (button.classList.contains("liked")) {
    currentLikes++;
  } else {
    currentLikes--;
  }
  likesSpan.textContent = currentLikes;
}