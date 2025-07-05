import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import uploadImage from '../../utils/uploadImage';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch user profile
    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
            setUser(response.data);
            setName(response.data.name);
            setEmail(response.data.email);
            setProfileImage(response.data.profileImageUrl);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            toast.error('Failed to fetch profile.');
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    // ✅ Handle image selection (preview before upload)
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setProfileImage(URL.createObjectURL(file)); // Show preview
        }
    };

    // ✅ Handle Profile Update
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = user.profileImageUrl;

            // If new image selected, upload it
            if (selectedImage) {
                const { imageUrl: uploadedImageUrl } = await uploadImage(selectedImage);
                imageUrl = uploadedImageUrl;
            }

            // Send update request
            await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
                name,
                email,
                profileImageUrl: imageUrl,
            });

            toast.success('Profile updated successfully!');
            fetchUserProfile(); // Refresh profile

        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Profile update failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto my-10 bg-white p-5 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>

            <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover border" />
                    <input type="file" accept="image/*" onChange={handleImageSelect} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
