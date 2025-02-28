import { useState } from "react";
import { Bell } from "lucide-react";

const Notification = () => {
  const [hasNotification, setHasNotification] = useState(true); // Start with an unread notification

  const handleClick = () => {
    setHasNotification(false); // Mark notifications as read when clicked
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <Bell className="w-6 h-6 text-gray-600 hover:text-black transition" />
      
      {hasNotification && (
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
      )}
    </div>
  );
};

export default Notification;
