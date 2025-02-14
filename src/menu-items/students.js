// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconSchool,
  IconCalendarUser,
  IconUsersGroup,
  IconFileTypePdf
} from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,

  IconUsersGroup,
  IconSchool,
  IconCalendarUser,
  IconFileTypePdf 
};

// ==============================|| students MENU ITEMS ||============================== //

const students = {
  id: 'students',
  title: 'Students',
  type: 'group',
  children: [
    {
      id: 'view-students',
      title: 'View Students',
      type: 'item',
      url: '/students/view',
      icon: icons.IconUsersGroup,
      breadcrumbs: true
    },
    {
      id: 'new-admission',
      title: 'New Admission',
      type: 'item',
      url: '/students/new-admission',
      icon: icons.IconSchool,
      breadcrumbs: true
    },
    // {
    //   id: 'students-docs',
    //   title: 'Students-Docs',
    //   type: 'item',
    //   url: '/students/students-docs',
    //   icon: icons.IconFileTypePdf ,
    //   breadcrumbs: true
    // },
    {
      id: 'attendances',
      title: 'Attendances',
      type: 'item',
      url: '/students/attendances',
      icon: icons.IconCalendarUser,
      breadcrumbs: true
    }
  ]
};

export default students;
