// assets
import { IconUserPlus } from '@tabler/icons-react';
import { IconUsers } from '@tabler/icons-react';
import { IconTypography, IconPalette } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconUsers,
  IconUserPlus,
};

// ==============================|| staffs MENU ITEMS ||============================== //

const staffs = {
  id: 'staffs',
  title: 'Staffs',
  type: 'group',
  children: [
    {
      id: 'view-staffs',
      title: 'View Staffs',
      type: 'item',
      url: '/staffs/view',
      icon: icons.IconUsers,
      breadcrumbs: true
    },
    {
      id: 'add-staffs',
      title: 'Add Staffs',
      type: 'item',
      url: '/staffs/add',
      icon: icons.IconUserPlus,
      breadcrumbs: true
    }
  ]
};

export default staffs;
