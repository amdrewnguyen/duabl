import React from 'react';

const ProfileImage = ({ user, onClick }) => {
  let initials;
  if (user.name) {
    const names = user.name.split(" ");
    initials = `${names[0][0]}${names[1][0]}`.toUpperCase();
  } else {
    initials = "";
  }

  return user.imageUrl ? (
    <div onClick={onClick} className="profile-image">
      <img src={user.imageUrl}></img>
    </div>
  ) : (
    <div onClick={onClick} className="profile-image">
      {initials}
    </div>
  );
};

export default ProfileImage;
