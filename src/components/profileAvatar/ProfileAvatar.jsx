import './ProfileAvatar.css'


// gets firstname & Lastname from ProfileService 
export function getInitials(nameOrEmail) {
    if (!nameOrEmail) return "";
    const parts = nameOrEmail.trim().split(" ");
    if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

export const ProfileAvatar = ({ avatarUrl, nameOrEmail }) => {
    if (avatarUrl) {
        return <img className="profile-avatar" src={avatarUrl} alt="Profile Avatar" />;
    }
    const initials = getInitials(nameOrEmail);
    return (
        <div className="profile-avatar profile-avatar-initials">
            {initials || <img src={avatarUrl} alt="Default" />}
        </div>
    );
};