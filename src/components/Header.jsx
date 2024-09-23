import React, { useState, useEffect } from 'react';
import { MdNotificationsActive } from "react-icons/md";
import { FaCheck, FaTimes } from "react-icons/fa";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Client A", completed: false, dismissed: false },
    { id: 2, text: "Client B", completed: false, dismissed: false },
    { id: 3, text: "Client C", completed: false, dismissed: false },
    { id: 4, text: "Client D", completed: false, dismissed: false }
  ]);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  // Function to toggle the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to mark a notification as completed
  const markAsCompleted = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, completed: true } : notification
      )
    );
  };

  // Function to dismiss a notification
  const dismissNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, dismissed: true } : notification
      )
    );
  };

  // Infinite scroll effect
  const loadMoreNotifications = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const newItems = notifications.slice(startIndex, endIndex);
    setVisibleNotifications((prev) => [...prev, ...newItems]);
  };

  // Detect when user scrolls near the bottom and load more notifications
  const handleScroll = (e) => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Load more notifications when the page changes
  useEffect(() => {
    loadMoreNotifications();
    console.log();
  }, [page]);

  

  return (
    <>
      <header className='fixed top-0 right-0 z-50 flex items-center justify-between p-3 w-[64.5rem] h-[75px] border bg-gradient-to-r from-blue-300 to-blue-600'>
        <div className='flex-1'>
          
        </div>
        
        {/* Notifications Section */}
        <ul className='flex justify-end gap-3 text-black'>
          <li
            className='flex items-center text-white cursor-pointer hover:underline'
            onClick={toggleModal}
          >
            <MdNotificationsActive className='mr-2' />
            Notifications
          </li>
        </ul>
      </header>

      {/* Notifications Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-96">
            <h2 className="mb-4 text-xl font-bold">Clients</h2>
            <ul className="space-y-2">
              {visibleNotifications
                .filter((notification) => !notification.dismissed)
                .map((notification) => (
                  <li
                    key={notification.id}
                    className={`p-2 bg-gray-100 rounded-md flex justify-between items-center ${notification.completed ? 'bg-green-100' : ''}`}
                  >
                    <span>{notification.text}</span>
                    <div className="flex gap-2">
                      {!notification.completed && (
                        <button
                          className="text-green-900 hover:text-green-800"
                          onClick={() => markAsCompleted(notification.id)}
                        >
                          <FaCheck />
                        </button>
                      )}
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
            <button
              className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-500"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export { Header };
