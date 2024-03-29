import {ItemType} from 'antd/es/menu/hooks/useItems';

import {ROUTES} from '__routes';
import {routeManager} from '__utils/routing/routeManager';

export const MENU_ITEMS: ItemType[] = [
    {
        key: ROUTES.HOME.INDEX,
        label: 'Home',
        onClick: () => routeManager.goToHome(),
    },
    {
        key: ROUTES.USERS.INDEX,
        label: 'Users',
        onClick: () => routeManager.goToUsers(),
    },
    {
        key: ROUTES.TEST_PAGE.INDEX,
        label: 'Test Page',
        onClick: () => routeManager.goToTestPage(),
    },
    {
        key: ROUTES.TEST_IMAGES.INDEX,
        label: 'Test Images',
        onClick: () => routeManager.goToTestImages(),
    },
];
