import React, { useState } from 'react';
import { IconMail, IconCalendar, IconUser, IconInfoCircle } from '@tabler/icons-react'; // Import Tabler Icons
import { Badge, Card, CardContent, CardHeader, Typography } from '@mui/material';
import ScrollBar from 'react-perfect-scrollbar';

const DashboardNotifications = ({ isLoading }) => {
  const notifications = [
    {
      id: 4,
      type: 'info',
      title: 'System Update',
      description: 'New features have been deployed to production',
      time: '4 hours ago',
      unread: false
    },

    {
      id: 2,
      type: 'calendar',
      title: 'Attendace',
      description: `Today's Attendace is not marked`,
      time: '25 minutes ago',
      unread: true
    }
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'message':
        return <IconMail className="h-4 w-4" />; // Tabler Mail Icon
      case 'calendar':
        return <IconCalendar className="h-4 w-4" />; // Tabler Calendar Icon
      case 'user':
        return <IconUser className="h-4 w-4" />; // Tabler User Icon
      default:
        return <IconInfoCircle className="h-4 w-4" />; // Tabler Info Icon
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card style={{minHeight:400}}>
      {/* <CardHeader> */}
        <Typography p={"32px 32px 0px 32px"} >Notifications</Typography>
      {/* </CardHeader> */}
      <CardContent>
        <ScrollBar className="h-[400px] pr-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`mb-4 p-4 rounded-lg transition-colors ${notification.unread ? 'bg-blue-50' : 'bg-white'} hover:bg-gray-50`}
            >
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${notification.unread ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">
                      {notification.title}
                    
                    </h4>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollBar>
      </CardContent>
    </Card>
  );
};

export default DashboardNotifications;
