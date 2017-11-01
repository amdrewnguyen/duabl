import React from 'react';

const ProfileImage = ({ user, onClick, size }) => {
  const sizeStyle = size ? {
    "width": `${size}px`,
    "height": `${size}px`,
  } : {
    "width": "32px",
    "height": "32px",
  };

  return (user.imageUrl !== "missing.png") ? (
    <div onClick={onClick} className="profile-image" style={sizeStyle}>
      <img src={user.imageUrl}></img>
    </div>
  ) : (
    <div onClick={onClick} className="profile-image" style={sizeStyle}>
      {user.initials}
    </div>
  );
};

export default ProfileImage;
