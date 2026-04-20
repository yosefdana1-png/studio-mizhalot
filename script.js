/* Studio Matzhalot - Script (Final Smart Version) */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. יצירת ה-Lightbox (תצוגת תמונות) ---
    const lightboxHTML = `
        <div id="lightbox">
            <span class="lightbox-close">&times;</span>
            <img id="lightbox-img" src="" alt="תמונה מוגדלת">
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtnLightbox = document.querySelector('.lightbox-close');
    
    // פתיחת לייטבוקס בלחיצה על portfolio-item (לא על כפתורים)
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // אל תפתח לייטבוקס אם לחצו על כפתור
            if (e.target.closest('.portfolio-btn') || e.target.classList.contains('portfolio-btn')) {
                return;
            }
            
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
        
        // הוספת סמן יד להראות שאפשר ללחוץ
        item.style.cursor = 'pointer';
    });

    closeBtnLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // סגירה עם ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });


    // --- 2. ניהול התפריט והמבורגר ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const closeBtnMenu = document.querySelector('.close-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const allMenuLinks = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        // פתיחת תפריט
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.add('active');
            document.body.classList.add('menu-open'); // מוסיף class ל-body
        });

        // סגירת תפריט עם X
        if (closeBtnMenu) {
            closeBtnMenu.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open'); // מסיר class מ-body
            });
        }

        // סגירה בלחיצה על קישור (חוץ מתיק עבודות שנפתח)
        allMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (!link.classList.contains('dropdown-toggle')) {
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open'); // מסיר class מ-body
                }
            });
        });

        // סגירה בלחיצה בחוץ
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open'); // מסיר class מ-body
            }
        });
    }

    // ניהול דרופדאון (תיק עבודות)
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const parent = toggle.closest('li'); // מוצא את ה-li שעוטף
            if (parent) parent.classList.toggle('active');
        });
    });

    // --- 3. כפתור וואטסאפ למוצרים ---
    window.contactAboutWork = function (button) {
        const card = button.closest('.portfolio-item');
        const title = card ? card.querySelector('h3').innerText : 'עבודה מהאתר';
        const message = `היי, ראיתי את העיצוב "${title}" באתר ואני רוצה משהו בסגנון!`;
        const url = `https://wa.me/972585888205?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // כפתור גלילה למעלה
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});


/* --- 4. מנגנון הגלילה החכם (התיקון הגדול) --- */
window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;

    // א. הצגה/הסתרה של כפתור "חזור למעלה"
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        scrollTopBtn.style.display = scrollPosition > 300 ? 'flex' : 'none';
    }

    // ב. הדגשת קישורים בתפריט
    // אנחנו בודקים אלו סקשנים קיימים *כרגע* בדף
    const sections = document.querySelectorAll('section[id]');
    
    // אם אין סקשנים עם ID (כמו בדפים פנימיים), הקוד הזה לא ירוץ ולא יהרוס את ההדגשה הקבועה
    if (sections.length > 0) {
        sections.forEach(section => {
            let top = section.offsetTop - 150;
            let height = section.offsetHeight;
            let id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                // מצא את הקישור שמוביל לסקשן הזה
                let activeLink = document.querySelector('.nav-links a[href*="#' + id + '"]');
                
                // תנאי קריטי: מדגישים רק אם הקישור קיים, ורק אם הוא לא מסומן כבר כ-current-page
                if (activeLink && !activeLink.classList.contains('current-page')) {
                    
                    // מנקים הדגשה מכל הקישורים האחרים (שאין להם current-page)
                    document.querySelectorAll('.nav-links a:not(.current-page)').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // ג. טיפול מיוחד לדף הבית (למעלה)
    if (scrollPosition < 100) {
        let homeLink = document.getElementById('home-link');
        // רק אם הקישור "בית" קיים (כלומר אנחנו בדף הבית)
        if (homeLink) {
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            homeLink.classList.add('active');
        }
    }
});
/* --- סקריפט לפס התקדמות גלילה --- */
window.onscroll = function() { updateProgressBar() };

function updateProgressBar() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  
  // עדכון הרוחב של הפס
  var progressBar = document.querySelector(".header-progress-bar");
  if (progressBar) {
      progressBar.style.width = scrolled + "%";
  }
}
