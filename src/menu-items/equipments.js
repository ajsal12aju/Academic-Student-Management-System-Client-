// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill
};

// ==============================|| reports MENU ITEMS ||============================== //

const reports = {
  id: 'reports',
  title: 'Logs & Reports',
  type: 'group',
  children: [
    {
      id: 'reports',
      title: 'Fee-payments',
      type: 'item',
      url: '/reports/fee-payments',
      // icon: icons.IconPalette,
      breadcrumbs: false
    },
  
  ]
};

export default reports;
