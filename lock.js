 (function () {
     // אל תפעיל נעילה אם זה גוגל או בוט חיפוש אחר
     if (/googlebot|bingbot|yahoo|duckduckbot|baiduspider|yandex|sogou|exabot|facebot|ia_archiver/i.test(navigator.userAgent)) {
         return; // תן לבוטים של מנועי חיפוש לעבור
     }
     
     if (sessionStorage.getItem('site_unlocked') === 'true') return;

     const style = document.createElement('style');
     style.innerHTML = `
         body { overflow: hidden; }
         #lock-overlay {
             position: fixed; top: 0; left: 0; width: 100%; height: 100%;
             background: rgba(0, 0, 0, 0.4);
             backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px);
             z-index: 9999999; display: flex; justify-content: center; align-items: center;
             font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
         }
         #glass-card {
             background: rgba(255, 255, 255, 0.25);
             backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
             border: 1px solid rgba(255, 255, 255, 0.3);
             box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
             border-radius: 24px; padding: 40px; text-align: center; width: 320px;
             color: white; animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1);
         }
         #glass-card h2 { margin: 0 0 20px 0; font-weight: 500; font-size: 24px; }
         #pass-input {
             width: 80%; padding: 14px; border-radius: 12px;
             border: 1px solid rgba(255, 255, 255, 0.4);
             background: rgba(255, 255, 255, 0.15);
             color: white; font-size: 18px; text-align: center; outline: none;
             margin-bottom: 20px; transition: 0.3s;
         }
         #pass-input::placeholder { color: rgba(255, 255, 255, 0.7); }
         #pass-input:focus { background: rgba(255, 255, 255, 0.25); border-color: #fff; }
         #unlock-btn {
             background: #fff; color: #333; border: none; padding: 12px 35px;
             border-radius: 50px; font-weight: 700; font-size: 16px; cursor: pointer;
             transition: transform 0.2s; box-shadow: 0 4px 15px rgba(0,0,0,0.1);
         }
         #unlock-btn:active { transform: scale(0.96); }
         .shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
         @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
         @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
     `;
     document.head.appendChild(style);

     const overlay = document.createElement('div');
     overlay.id = 'lock-overlay';
     overlay.innerHTML = `
         <div id="glass-card">
             <div style="font-size: 40px; margin-bottom: 15px;">🔒</div>
             <h2>האתר בבנייה</h2>
             <input type="password" id="pass-input" placeholder="הקש סיסמה" autocomplete="off" />
             <br><button id="unlock-btn">כניסה</button>
         </div>
     `;
     
     // הפעלת הנעילה
     const check = () => {
         const input = document.getElementById('pass-input');
         const card = document.getElementById('glass-card');
         if (input.value === '1234') { // שנה סיסמה כאן
             sessionStorage.setItem('site_unlocked', 'true');
             document.getElementById('lock-overlay').style.opacity = '0';
             setTimeout(() => { document.getElementById('lock-overlay').remove(); document.body.style.overflow = 'auto'; }, 400);
         } else {
             input.value = ''; card.classList.add('shake');
             setTimeout(() => card.classList.remove('shake'), 400); input.focus();
         }
     };

     document.addEventListener('DOMContentLoaded', () => {
         document.body.appendChild(overlay);
         document.getElementById('unlock-btn').addEventListener('click', check);
         document.getElementById('pass-input').addEventListener('keypress', (e) => { if (e.key === 'Enter') check(); });
         document.getElementById('pass-input').focus();
     });
 })();
