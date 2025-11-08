import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Post, User, Category } from './types';
import { POSTS, USERS, CURRENT_USER_ID } from './constants';
import Header from './components/Header';
import PostGrid from './components/PostGrid';
import FloatingActionButton from './components/FloatingActionButton';
import Modal from './components/Modal';
import AddPostForm from './components/AddPostForm';
import EmojiRain from './components/EmojiRain';
import LoginPage from './components/LoginPage';
import UserProfilePage from './components/UserProfilePage';
import EditProfileModal from './components/EditProfileModal';

type Theme = 'light' | 'dark';
type CurrentPage = 'home' | 'profile';

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('dark');
    const [posts, setPosts] = useState<Post[]>(POSTS);
    const [users, setUsers] = useState<User[]>(USERS);
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [activeFilter, setActiveFilter] = useState<Category | 'all' | 'nearby'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [isRaining, setIsRaining] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentPage, setCurrentPage] = useState<CurrentPage>('home');
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);

    const currentUser = useMemo(() => users.find(u => u.id === CURRENT_USER_ID), [users]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);
    
    useEffect(() => {
        if (activeFilter === 'nearby' && isAuthenticated) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting location", error);
                    alert("Could not get your location. Please enable location services.");
                    setActiveFilter('all');
                }
            );
        }
    }, [activeFilter, isAuthenticated]);
    
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleAddPost = (post: Omit<Post, 'id' | 'userId' | 'ratings' | 'comments' | 'createdAt'>) => {
        const newPost: Post = {
            ...post,
            id: `p${Date.now()}`,
            userId: CURRENT_USER_ID,
            ratings: [],
            comments: [],
            createdAt: 'Just now',
        };
        setPosts([newPost, ...posts]);
        setShowAddPostModal(false);
    };
    
    const handleUpdatePost = (updatedPost: Post) => {
        setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
        setShowAddPostModal(false);
        setEditingPost(null);
    };

    const handleDeletePost = (postId: string) => {
        setPosts(posts.filter(p => p.id !== postId));
    };

    const handleEditPost = (post: Post) => {
        setEditingPost(post);
        setShowAddPostModal(true);
    };
    
    const handleOpenAddModal = () => {
        setEditingPost(null);
        setShowAddPostModal(true);
    }
    
    const handleRatePost = (postId: string, rating: number) => {
        setPosts(posts.map(p => {
            if (p.id === postId) {
                const existingRatingIndex = p.ratings.findIndex(r => r.userId === CURRENT_USER_ID);
                const newRatings = [...p.ratings];
                if (existingRatingIndex > -1) {
                    newRatings[existingRatingIndex] = { userId: CURRENT_USER_ID, count: rating };
                } else {
                    newRatings.push({ userId: CURRENT_USER_ID, count: rating });
                }
                return { ...p, ratings: newRatings };
            }
            return p;
        }));
        
        if (rating >= 4) {
            setIsRaining(true);
            setTimeout(() => setIsRaining(false), 3000);
        }
    };

    const handleUpdateUser = (updatedUserData: { name: string; bio: string }) => {
        if (!currentUser) return;
        const updatedUser = { ...currentUser, ...updatedUserData };
        setUsers(prevUsers => prevUsers.map(u => (u.id === updatedUser.id ? updatedUser : u)));
        setShowEditProfileModal(false);
    };
    
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        if (currentPage !== 'home' && term) {
            setCurrentPage('home');
        }
    }

    const getDistance = (loc1: {lat: number, lng: number}, loc2: {lat: number, lng: number}) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (loc2.lat - loc1.lat) * (Math.PI/180);
        const dLon = (loc2.lng - loc1.lng) * (Math.PI/180);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(loc1.lat * (Math.PI/180)) * Math.cos(loc2.lat * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c; // Distance in km
    }
    
    const filteredPosts = useMemo(() => {
        return posts
            .filter(post => {
                if (activeFilter === 'all') return true;
                if (activeFilter === 'nearby') {
                    if (!userLocation || !post.coords) return false;
                    // Show posts within 50km
                    return getDistance(userLocation, post.coords) < 50;
                }
                return post.category === activeFilter;
            })
            .filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [posts, activeFilter, searchTerm, userLocation]);

    const getUserById = useCallback((userId: string) => users.find(u => u.id === userId), [users]);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    if (!isAuthenticated) {
        return <LoginPage onLoginSuccess={handleLogin} />;
    }
    
    const renderPageContent = () => {
        if (currentPage === 'profile' && currentUser) {
            return (
                <UserProfilePage
                    user={currentUser}
                    posts={posts.filter(p => p.userId === currentUser.id)}
                    onBack={() => { setCurrentPage('home'); setActiveFilter('all'); }}
                    onEditPost={handleEditPost}
                    onDeletePost={handleDeletePost}
                    currentUser={currentUser}
                    onRatePost={handleRatePost}
                    onEditProfile={() => setShowEditProfileModal(true)}
                />
            );
        }
        
        return (
             <PostGrid
                posts={filteredPosts}
                users={users}
                currentUser={currentUser}
                onRatePost={handleRatePost}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
                activeFilter={activeFilter}
                setActiveFilter={(filter) => { setCurrentPage('home'); setActiveFilter(filter); }}
            />
        );
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-500">
            {isRaining && <EmojiRain />}
            <Header 
                theme={theme}
                toggleTheme={toggleTheme}
                currentUser={currentUser}
                searchTerm={searchTerm}
                setSearchTerm={handleSearch}
                onShowProfile={() => setCurrentPage('profile')}
                onShowEditProfile={() => setShowEditProfileModal(true)}
            />
            <main className="pt-36 lg:pt-24 px-4 sm:px-6 lg:px-8 pb-16">
                {renderPageContent()}
            </main>
            {currentPage === 'home' && <FloatingActionButton onClick={handleOpenAddModal} />}
            {showAddPostModal && (
                <Modal onClose={() => { setShowAddPostModal(false); setEditingPost(null); }}>
                    <AddPostForm
                        onAddPost={handleAddPost}
                        onUpdatePost={handleUpdatePost}
                        existingPost={editingPost}
                    />
                </Modal>
            )}
             {showEditProfileModal && currentUser && (
                <Modal onClose={() => setShowEditProfileModal(false)}>
                    <EditProfileModal
                        user={currentUser}
                        onSave={handleUpdateUser}
                        onClose={() => setShowEditProfileModal(false)}
                    />
                </Modal>
            )}
            <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                Made with ❤️ for India
            </footer>
        </div>
    );
};

export default App;