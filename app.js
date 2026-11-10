/**
 * ლუკა სულაძე | პორტფოლიო
 * app.js - მობილური ნავიგაცია & JSONPlaceholder API ინტეგრაცია
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. მობილური ნავიგაცია და ბურგერ მენიუ (Mobile Hamburger Menu)
       ========================================================================== */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconBars = document.getElementById('menu-icon-bars');
    const iconClose = document.getElementById('menu-icon-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleMenu() {
        if (!menuBtn || !mobileMenu) return;
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('is-open');
        if (iconBars) iconBars.classList.toggle('hidden');
        if (iconClose) iconClose.classList.toggle('hidden');
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // მენიუს დახურვა ბმულზე დაკლიკებისას
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

    // მენიუს დახურვა Escape ღილაკზე
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
            toggleMenu();
        }
    });


    /* ==========================================================================
       2. შეტყობინებების ჩვენება (API Notification Alert Helper)
       ========================================================================== */
    const apiAlert = document.getElementById('api-alert');

    function showAlert(message, type = 'success') {
        if (!apiAlert) return;
        apiAlert.className = `p-4 rounded-xl border text-sm transition-all duration-300 ${type === 'success'
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                : type === 'error'
                    ? 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                    : 'bg-indigo-950/70 border-indigo-500/50 text-indigo-200'
            }`;
        apiAlert.innerHTML = `
            <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                    <span class="text-base">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
                    <span>${message}</span>
                </div>
                <button type="button" onclick="document.getElementById('api-alert').classList.add('hidden')" class="text-xs opacity-70 hover:opacity-100 font-bold px-1.5 py-0.5">✕</button>
            </div>
        `;
        apiAlert.classList.remove('hidden');

        // ავტომატური გაქრობა 6 წამში
        setTimeout(() => {
            apiAlert.classList.add('hidden');
        }, 6000);
    }


    /* ==========================================================================
       3. თანამშრომლების ჩატვირთვა (GET /users)
       ========================================================================== */
    const teamGrid = document.getElementById('team-grid');
    const teamLoader = document.getElementById('team-loader');
    const USERS_API = 'https://jsonplaceholder.typicode.com/users';

    // ავატარის ფერების გენერაცია
    const gradientColors = [
        'from-blue-600 to-indigo-600',
        'from-emerald-600 to-teal-600',
        'from-purple-600 to-pink-600',
        'from-amber-600 to-orange-600',
        'from-cyan-600 to-blue-600',
        'from-rose-600 to-red-600'
    ];

    function getInitials(name) {
        return name
            .split(' ')
            .map(part => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }

    function createEmployeeCard(user, isNew = false) {
        const color = gradientColors[user.id % gradientColors.length] || 'from-indigo-600 to-cyan-600';
        const card = document.createElement('article');
        card.id = `user-card-${user.id}`;
        card.className = `employee-card group p-5 sm:p-6 rounded-2xl bg-slate-900/50 border ${isNew ? 'border-emerald-500/60 ring-2 ring-emerald-500/20' : 'border-slate-800/80'
            } backdrop-blur-sm shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all duration-300`;

        card.innerHTML = `
            <div>
                <!-- ჰედერი: ავატარი და სტატუსი -->
                <div class="flex items-start justify-between gap-3 mb-4">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center font-bold text-white text-base shadow-md">
                            ${getInitials(user.name)}
                        </div>
                        <div class="min-w-0">
                            <h3 class="text-base sm:text-lg font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                                ${user.name}
                            </h3>
                            <p class="text-xs text-indigo-400 font-mono">@${user.username || 'user'}</p>
                        </div>
                    </div>
                    ${isNew
                ? '<span class="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">ახალი</span>'
                : `<span class="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">#${user.id}</span>`
            }
                </div>

                <!-- კომპანია & როლი -->
                <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 mb-4 text-xs">
                    <div class="text-slate-400 flex items-center gap-1.5 font-medium mb-1">
                        <span>🏢</span>
                        <span class="text-white font-semibold">${user.company?.name || 'Freelance'}</span>
                    </div>
                    <p class="text-slate-400 italic line-clamp-1">"${user.company?.catchPhrase || 'Software Specialist'}"</p>
                </div>

                <!-- კონტაქტები -->
                <ul class="space-y-2 text-xs text-slate-300 mb-5 font-mono">
                    <li class="flex items-center gap-2 truncate">
                        <span class="text-slate-500">📧</span>
                        <a href="mailto:${user.email}" class="hover:text-indigo-400 transition-colors truncate">${user.email}</a>
                    </li>
                    <li class="flex items-center gap-2 truncate">
                        <span class="text-slate-500">📞</span>
                        <span class="truncate">${user.phone}</span>
                    </li>
                    <li class="flex items-center gap-2 truncate">
                        <span class="text-slate-500">🌐</span>
                        <a href="https://${user.website}" target="_blank" rel="noopener noreferrer" class="hover:text-cyan-400 transition-colors truncate">${user.website}</a>
                    </li>
                    <li class="flex items-center gap-2 truncate">
                        <span class="text-slate-500">📍</span>
                        <span class="truncate">${user.address?.city || 'Georgia'}</span>
                    </li>
                </ul>
            </div>

            <!-- ინტერაქტიული მოქმედებები (GET & DELETE Methods) -->
            <div class="flex items-center gap-2 pt-4 border-t border-slate-800/60">
                <button type="button" onclick="window.viewUserPosts(${user.id}, '${escapeQuotes(user.name)}')"
                    class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-medium transition-all cursor-pointer">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                    <span>პოსტები (GET)</span>
                </button>
                <button type="button" onclick="window.deleteEmployee(${user.id}, '${escapeQuotes(user.name)}')"
                    class="inline-flex items-center justify-center p-2 rounded-xl bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 text-xs transition-all cursor-pointer"
                    title="თანამშრომლის წაშლა (DELETE)">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        `;
        return card;
    }

    function escapeQuotes(str) {
        return (str || '').replace(/'/g, "\\'");
    }

    async function loadEmployees() {
        if (!teamGrid || !teamLoader) return;
        try {
            teamLoader.classList.remove('hidden');
            const res = await fetch(USERS_API);
            if (!res.ok) throw new Error(`HTTP შეცდომა: ${res.status}`);
            const users = await res.json();

            teamGrid.innerHTML = '';
            users.forEach(user => {
                teamGrid.appendChild(createEmployeeCard(user));
            });
            teamLoader.classList.add('hidden');
        } catch (err) {
            console.error('თანამშრომლების ჩატვირთვა ვერ მოხერხდა:', err);
            teamLoader.innerHTML = `
                <div class="text-center py-6">
                    <p class="text-rose-400 text-sm mb-3">მონაცემების ჩატვირთვა ვერ მოხერხდა: ${err.message}</p>
                    <button onclick="location.reload()" class="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-mono hover:bg-slate-700">ხელახლა ცდა</button>
                </div>
            `;
        }
    }

    loadEmployees();


    /* ==========================================================================
       4. დამატებითი მეთოდი: GET /users/:id/posts (თანამშრომლის პოსტები)
       ========================================================================== */
    const postsModal = document.getElementById('posts-modal');
    const postsModalTitle = document.getElementById('posts-modal-title');
    const postsModalContent = document.getElementById('posts-modal-content');

    window.viewUserPosts = async function (userId, userName) {
        if (!postsModal) return;
        postsModal.classList.remove('hidden');
        postsModalTitle.textContent = `${userName}-ის პოსტები`;
        postsModalContent.innerHTML = `
            <div class="flex items-center justify-center py-10 text-slate-400">
                <svg class="animate-spin w-6 h-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                <span>იტვირთება პოსტები (GET /users/${userId}/posts)...</span>
            </div>
        `;

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const posts = await res.json();

            if (posts.length === 0) {
                postsModalContent.innerHTML = '<p class="text-slate-400 text-sm text-center py-6">პოსტები ვერ მოიძებნა.</p>';
                return;
            }

            postsModalContent.innerHTML = `
                <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                    ${posts.slice(0, 5).map(post => `
                        <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                            <h4 class="text-sm font-bold text-indigo-300 capitalize mb-1">${post.title}</h4>
                            <p class="text-xs text-slate-400 leading-relaxed">${post.body}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            showAlert(`წარმატებით ჩაიტვირთა ${posts.length} პოსტი მომხმარებლისთვის: ${userName} (GET 200 OK)`);
        } catch (err) {
            postsModalContent.innerHTML = `<p class="text-rose-400 text-sm py-4">შეცდომა პოსტების ჩატვირთვისას: ${err.message}</p>`;
        }
    };

    window.closePostsModal = function () {
        if (postsModal) postsModal.classList.add('hidden');
    };


    /* ==========================================================================
       5. დამატებითი მეთოდი: DELETE /users/:id (თანამშრომლის წაშლა)
       ========================================================================== */
    window.deleteEmployee = async function (userId, userName) {
        if (!confirm(`ნამდვილად გსურთ წაშალოთ "${userName}"? (DELETE მეთოდი)`)) return;

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                const card = document.getElementById(`user-card-${userId}`);
                if (card) {
                    card.classList.add('opacity-0', 'scale-95');
                    setTimeout(() => card.remove(), 300);
                }
                showAlert(`თანამშრომელი "${userName}" წარმატებით წაიშალა! (DELETE 200 OK)`, 'success');
            } else {
                throw new Error(`HTTP შეცდომა: ${res.status}`);
            }
        } catch (err) {
            showAlert(`წაშლის შეცდომა: ${err.message}`, 'error');
        }
    };


    /* ==========================================================================
       6. დამატებითი მეთოდი: POST /users (ახალი თანამშრომლის დამატება)
       ========================================================================== */
    const addModal = document.getElementById('add-user-modal');
    const addBtn = document.getElementById('add-employee-btn');
    const addForm = document.getElementById('add-user-form');

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (addModal) addModal.classList.remove('hidden');
        });
    }

    window.closeAddModal = function () {
        if (addModal) addModal.classList.add('hidden');
    };

    if (addForm) {
        addForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = addForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>იგზავნება (POST)...</span>';

            const newEmployeeData = {
                name: document.getElementById('new-user-name').value,
                username: document.getElementById('new-user-username').value || 'newdev',
                email: document.getElementById('new-user-email').value,
                phone: document.getElementById('new-user-phone').value || '+995 555 123 456',
                website: document.getElementById('new-user-website').value || 'portfolio.ge',
                company: {
                    name: document.getElementById('new-user-company').value || 'Tech Solutions',
                    catchPhrase: 'Full Stack Development'
                },
                address: {
                    city: 'Tbilisi'
                }
            };

            try {
                const res = await fetch(USERS_API, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify(newEmployeeData)
                });

                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const createdUser = await res.json();

                // ახალი ბარათის დამატება სიის თავში
                if (teamGrid) {
                    const card = createEmployeeCard(createdUser, true);
                    teamGrid.prepend(card);
                }

                showAlert(`ახალი თანამშრომელი "${createdUser.name}" წარმატებით დაემატა! ID: #${createdUser.id} (POST 201 Created)`, 'success');
                addForm.reset();
                window.closeAddModal();
            } catch (err) {
                showAlert(`თანამშრომლის დამატება ვერ მოხერხდა: ${err.message}`, 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
        });
    }


    /* ==========================================================================
       7. დამატებითი მეთოდი: POST /posts (საკონტაქტო ფორმის გაგზავნა)
       ========================================================================== */
    const contactForm = document.querySelector('section#contact form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>იგზავნება...</span>';

            const payload = {
                title: nameInput ? nameInput.value : 'კონტაქტი',
                body: messageInput ? messageInput.value : '',
                email: emailInput ? emailInput.value : '',
                userId: 1
            };

            try {
                const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify(payload)
                });

                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();

                showAlert(`შეტყობინება წარმატებით გაიგზავნა! ID: #${data.id} (POST 201 Created)`, 'success');
                contactForm.reset();
            } catch (err) {
                showAlert(`შეტყობინების გაგზავნის შეცდომა: ${err.message}`, 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }

});
