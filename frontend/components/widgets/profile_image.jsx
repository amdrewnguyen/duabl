import React from 'react';

const ProfileImage = ({ user, onClick }) => {
  return (user.imageUrl !== "missing.png") ? (
    <div onClick={onClick} className="profile-image">
      <img src={user.imageUrl}></img>
    </div>
  ) : (
    <div onClick={onClick} className="profile-image">
      {user.initials}
    </div>
  );
};

export default ProfileImage;
