// components/Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="px-4 py-2">
      <ul>
        {/* Dashboard */}
        <li>
          <a
            href="#"
            className="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4 opacity-50"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
              <rect x="4" y="4" width="6" height="6" rx="1" />
              <rect x="14" y="4" width="6" height="6" rx="1" />
              <rect x="4" y="14" width="6" height="6" rx="1" />
              <rect x="14" y="14" width="6" height="6" rx="1" />
            </svg>
            Dashboard
          </a>
        </li>

        {/* Analytics */}
        <li>
          <a
            href="#"
            className="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4 opacity-50"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
              <line x1="4" y1="19" x2="20" y2="19" />
              <polyline points="4 15 8 9 12 11 16 6 20 10" />
            </svg>
            Analytics
          </a>
        </li>

        {/* Invoices */}
        <li>
          <a
            href="#"
            className="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4 opacity-50"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
              <polyline points="14 3 14 8 19 8" />
              <path d="M17 21H7a2 2 0 0 1 -2 -2V5a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <line x1="9" y1="9" x2="10" y2="9" />
              <line x1="9" y1="13" x2="15" y2="13" />
              <line x1="9" y1="17" x2="15" y2="17" />
            </svg>
            Invoices
          </a>
        </li>

        {/* Tracking */}
        <li>
          <a
            href="#"
            className="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-blue-600 hover:text-blue-600 hover:bg-gray-200 bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4 opacity-50"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 9 15" />
            </svg>
            Tracking
          </a>
        </li>

        {/* History */}
        <li>
          <a
            href="#"
            className="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4 opacity-50"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
              <path d="M16 6h3a 1 1 0 011 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
              <line x1="8" y1="8" x2="12" y2="8" />
              <line x1="8" y1="12" x2="12" y2="12" />
              <line x1="8" y1="16" x2="12" y2="16" />
            </svg>
            History
          </a>
        </li>

        {/* Settings */}
        <li>
          <a
            href="#"
            className="mb-1 px-2 py-2 rounded-lg flex items-center font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-4 opacity-50"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
