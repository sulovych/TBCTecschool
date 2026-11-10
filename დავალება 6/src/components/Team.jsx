import React, { useState, useEffect } from 'react';
import Card from './common/Card';
import SectionHeader from './common/SectionHeader';
import Button from './common/Button';
import Badge from './common/Badge';
import Modal from './common/Modal';

/**
 * Team / Employees Component
 * თანამშრომლების სექცია JSONPlaceholder Users API-ის ინტეგრაციით (GET, POST, DELETE)
 */
export default function Team() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    // მოდალების მდგომარეობები
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isPostsModalOpen, setIsPostsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(false);

    // ფორმის მდგომარეობა
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        company: '',
        email: '',
        phone: '',
        website: ''
    });
    const [submitting, setSubmitting] = useState(false);

    // ფერების გრადიენტები ავატარისთვის
    const gradientColors = [
        'from-blue-600 to-indigo-600',
        'from-emerald-600 to-teal-600',
        'from-purple-600 to-pink-600',
        'from-amber-600 to-orange-600',
        'from-cyan-600 to-blue-600',
        'from-rose-600 to-red-600'
    ];

    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(part => part[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    const triggerAlert = (message, type = 'success') => {
        setAlert({ message, type });
        setTimeout(() => setAlert(null), 6000);
    };

    // 1. თანამშრომლების ჩატვირთვა (GET /users)
    const loadUsers = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!res.ok) throw new Error(`HTTP შეცდომა: ${res.status}`);
            const data = await res.json();
            setUsers(data);
        } catch (err) {
            triggerAlert(`მონაცემების ჩატვირთვა ვერ მოხერხდა: ${err.message}`, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // 2. პოსტების ნახვა (GET /users/:id/posts)
    const handleViewPosts = async (user) => {
        setSelectedUser(user);
        setIsPostsModalOpen(true);
        setPostsLoading(true);
        setUserPosts([]);

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const posts = await res.json();
            setUserPosts(posts);
            triggerAlert(`წარმატებით ჩაიტვირთა ${posts.length} პოსტი (${user.name}) - GET 200 OK`, 'info');
        } catch (err) {
            triggerAlert(`პოსტების ჩატვირთვის შეცდომა: ${err.message}`, 'error');
        } finally {
            setPostsLoading(false);
        }
    };

    // 3. თანამშრომლის წაშლა (DELETE /users/:id)
    const handleDeleteUser = async (user) => {
        if (!window.confirm(`ნამდვილად გსურთ წაშალოთ "${user.name}"? (DELETE მეთოდი)`)) return;

        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setUsers(prev => prev.filter(u => u.id !== user.id));
                triggerAlert(`თანამშრომელი "${user.name}" წარმატებით წაიშალა! (DELETE 200 OK)`, 'success');
            } else {
                throw new Error(`HTTP შეცდომა: ${res.status}`);
            }
        } catch (err) {
            triggerAlert(`წაშლის შეცდომა: ${err.message}`, 'error');
        }
    };

    // 4. ახალი თანამშრომლის დამატება (POST /users)
    const handleAddUserSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const newEmployee = {
            name: formData.name,
            username: formData.username || 'newdev',
            email: formData.email,
            phone: formData.phone || '+995 555 123 456',
            website: formData.website || 'portfolio.ge',
            company: {
                name: formData.company || 'Tech Solutions',
                catchPhrase: 'Full Stack Development'
            },
            address: {
                city: 'Tbilisi'
            }
        };

        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(newEmployee)
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const created = await res.json();

            // დავამატოთ სიის დასაწყისში
            setUsers(prev => [{ ...created, isNew: true }, ...prev]);
            triggerAlert(`ახალი თანამშრომელი "${created.name}" წარმატებით დაემატა! ID: #${created.id} (POST 201 Created)`, 'success');

            // ფორმის გასუფთავება & დახურვა
            setFormData({ name: '', username: '', company: '', email: '', phone: '', website: '' });
            setIsAddModalOpen(false);
        } catch (err) {
            triggerAlert(`თანამშრომლის დამატება ვერ მოხერხდა: ${err.message}`, 'error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="team" className="scroll-mt-20 sm:scroll-mt-24">
            <SectionHeader
                title="თანამშრომლები"
                subtitle="API რესურსი: jsonplaceholder.typicode.com/users"
                accentColor="emerald"
                action={
                    <Button
                        variant="emerald"
                        size="md"
                        onClick={() => setIsAddModalOpen(true)}
                        icon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        }
                    >
                        თანამშრომლის დამატება (POST)
                    </Button>
                }
            />

            {/* API შეტყობინების ალერტი */}
            {alert && (
                <div className={`mb-6 p-4 rounded-xl border text-sm transition-all duration-300 flex items-center justify-between gap-3 ${
                    alert.type === 'success'
                        ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                        : alert.type === 'error'
                        ? 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                        : 'bg-indigo-950/70 border-indigo-500/50 text-indigo-200'
                }`}>
                    <div className="flex items-center gap-2">
                        <span>{alert.type === 'success' ? '✅' : alert.type === 'error' ? '❌' : 'ℹ️'}</span>
                        <span>{alert.message}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setAlert(null)}
                        className="text-xs opacity-70 hover:opacity-100 font-bold px-1.5 py-0.5"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Loading Spinner */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
                    <svg className="animate-spin w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span className="text-sm font-mono">იტვირთება თანამშრომლების სია (GET /users)...</span>
                </div>
            ) : (
                /* თანამშრომლების ბადე (Reusable Cards) */
                <div className="team-grid grid gap-5 sm:gap-6">
                    {users.map((user, idx) => {
                        const color = gradientColors[user.id % gradientColors.length] || 'from-indigo-600 to-cyan-600';

                        return (
                            <Card
                                key={user.id}
                                hover={true}
                                glow={user.isNew}
                                className="employee-card group p-5 sm:p-6"
                            >
                                <div>
                                    {/* ჰედერი: ავატარი და სტატუსი */}
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${color} flex items-center justify-center font-bold text-white text-base shadow-md`}>
                                                {getInitials(user.name)}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-indigo-300 transition-colors">
                                                    {user.name}
                                                </h3>
                                                <p className="text-xs text-indigo-400 font-mono">
                                                    @{user.username || 'user'}
                                                </p>
                                            </div>
                                        </div>
                                        {user.isNew ? (
                                            <Badge variant="emerald">ახალი</Badge>
                                        ) : (
                                            <Badge variant="slate">#{user.id}</Badge>
                                        )}
                                    </div>

                                    {/* კომპანია & როლი */}
                                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 mb-4 text-xs">
                                        <div className="text-slate-400 flex items-center gap-1.5 font-medium mb-1">
                                            <span>🏢</span>
                                            <span className="text-white font-semibold">{user.company?.name || 'Freelance'}</span>
                                        </div>
                                        <p className="text-slate-400 italic line-clamp-1">
                                            "{user.company?.catchPhrase || 'Software Specialist'}"
                                        </p>
                                    </div>

                                    {/* კონტაქტები */}
                                    <ul className="space-y-2 text-xs text-slate-300 mb-5 font-mono">
                                        <li className="flex items-center gap-2 truncate">
                                            <span className="text-slate-500">📧</span>
                                            <a href={`mailto:${user.email}`} className="hover:text-indigo-400 transition-colors truncate">
                                                {user.email}
                                            </a>
                                        </li>
                                        <li className="flex items-center gap-2 truncate">
                                            <span className="text-slate-500">📞</span>
                                            <span className="truncate">{user.phone}</span>
                                        </li>
                                        <li className="flex items-center gap-2 truncate">
                                            <span className="text-slate-500">🌐</span>
                                            <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors truncate">
                                                {user.website}
                                            </a>
                                        </li>
                                        <li className="flex items-center gap-2 truncate">
                                            <span className="text-slate-500">📍</span>
                                            <span className="truncate">{user.address?.city || 'Georgia'}</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* მოქმედებები: GET & DELETE */}
                                <div className="flex items-center gap-2 pt-4 border-t border-slate-800/60">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => handleViewPosts(user)}
                                        icon={
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                        }
                                    >
                                        პოსტები (GET)
                                    </Button>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleDeleteUser(user)}
                                        title="თანამშრომლის წაშლა (DELETE)"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* მოდალი 1: პოსტების ნახვა (GET /users/:id/posts) */}
            <Modal
                isOpen={isPostsModalOpen}
                onClose={() => setIsPostsModalOpen(false)}
                title={`${selectedUser?.name || 'მომხმარებლის'}-ის პოსტები`}
                footer={
                    <Button variant="secondary" size="sm" onClick={() => setIsPostsModalOpen(false)}>
                        დახურვა
                    </Button>
                }
            >
                {postsLoading ? (
                    <div className="flex items-center justify-center py-10 text-slate-400">
                        <svg className="animate-spin w-6 h-6 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>იტვირთება პოსტები (GET /users/{selectedUser?.id}/posts)...</span>
                    </div>
                ) : userPosts.length === 0 ? (
                    <p className="text-slate-400 text-sm text-center py-6">პოსტები ვერ მოიძებნა.</p>
                ) : (
                    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                        {userPosts.slice(0, 5).map((post) => (
                            <div key={post.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                                <h4 className="text-sm font-bold text-indigo-300 capitalize mb-1">{post.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">{post.body}</p>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>

            {/* მოდალი 2: ახალი თანამშრომლის დამატება (POST /users) */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="ახალი თანამშრომელი (POST)"
                icon="➕"
                maxWidth="max-w-md"
            >
                <form onSubmit={handleAddUserSubmit} className="space-y-3.5">
                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">სრული სახელი *</label>
                        <input
                            type="text"
                            required
                            placeholder="მაგ: გიორგი ბერიძე"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">მეტსახელი</label>
                            <input
                                type="text"
                                placeholder="gio_dev"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">კომპანია</label>
                            <input
                                type="text"
                                placeholder="Agency Inc"
                                value={formData.company}
                                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">ელ-ფოსტა *</label>
                        <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">ტელეფონი</label>
                            <input
                                type="text"
                                placeholder="+995 599 000 000"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1">ვებსაიტი</label>
                            <input
                                type="text"
                                placeholder="mywebsite.ge"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>
                    <div className="pt-3 flex items-center justify-end gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsAddModalOpen(false)}
                        >
                            გაუქმება
                        </Button>
                        <Button
                            type="submit"
                            variant="emerald"
                            size="sm"
                            disabled={submitting}
                        >
                            {submitting ? 'იგზავნება (POST)...' : 'დამატება (POST)'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}

