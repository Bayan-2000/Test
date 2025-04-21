
/*✅ تحريك العناصر عند تحميل الصفحة (ظهور تدريجي + انزلاق)*/
$(document).ready(function () {
    $(".fade-in").css({ opacity: 0 }).animate({ opacity: 1 }, 1500);

    // تحريك العنصر للأعلى بشكل ناعم
    $(".slide-up").css({ position: "relative", top: "20px", opacity: 0 })
                 .animate({ top: "0", opacity: 1 }, 1000);

    // تأثير bounce عند التمرير على عناصر تحمل .bounce
    $(".bounce").hover(function () {
        $(this).effect("bounce", { times: 3 }, 300);
    });
});

/*✅ إخفاء/إظهار الهيدر حسب التمرير + إضافة ظل عند التمرير */
let lastScrollTop = 0;
const header = document.getElementById("main-header");

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // إخفاء الهيدر عند التمرير لأسفل، وإظهاره عند الرجوع للأعلى
    if (scrollTop > lastScrollTop) {
        header.style.top = "-100px"; // Scroll Down
    } else {
        header.style.top = "0"; // Scroll Up
    }

    // إضافة تأثير ظل للهيدر عند التمرير
    if (scrollTop > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

/*✅ منيو منسدلة (Dropdown Menu) تعمل عند النقر*/
document.addEventListener("DOMContentLoaded", function () {
    const dropbtn = document.querySelector(".dropbtn"); // زر فتح المنيو
    const dropdownContent = document.querySelector(".dropdown-content"); // المحتوى المنسدل

    // إظهار/إخفاء المنيو عند الضغط على الزر
    dropbtn.addEventListener("click", function () {
        dropdownContent.classList.toggle("show");
    });

    // إخفاء القائمة إذا ضغط المستخدم خارجها
    window.addEventListener("click", function (event) {
        if (!event.target.matches('.dropbtn')) {
            if (dropdownContent.classList.contains("show")) {
                dropdownContent.classList.remove("show");
            }
        }
    });
});

function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
}