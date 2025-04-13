// assets
import { IconBuilding, IconBuildingStore } from '@tabler/icons-react';

// constant
const icons = {
    IconBuilding,
    IconBuildingStore
};

const branches = {
    id: 'branches',
    title: 'Branches',
    type: 'group',
    children: [
        {
            id: 'view-branches',
            title: 'View Branches',
            type: 'item',
            url: '/branches/view',
            icon: icons.IconBuildingStore,
            breadcrumbs: true
        },
        {
            id: 'add-branch',
            title: 'Add Branch',
            type: 'item',
            url: '/branches/add',
            icon: icons.IconBuilding,
            breadcrumbs: true
        }
    ]
};

export default branches;
