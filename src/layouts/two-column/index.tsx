import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import { TStateType } from '@redux/reducers';

// import { useI18N } from '@utils/i18n';
import { AsideNavMenus, EAsideNavMenusMode } from './aside-nav';

import './index.module.scss';

const LayoutTwoColumn: FunctionComponent = () => {
  //   const intl = useI18N();
  const navigation = useSelector((state: TStateType) => state.navigation);
  //   const dispatch = useDispatch();

  return (
    <div styleName="two-column-layout">
      <div
        styleName={classnames('aside', {
          'aside-hide-mode': navigation.asideMode === EAsideNavMenusMode.Hide
        })}
      >
        <AsideNavMenus mode={navigation.asideMode} />
      </div>
      <div
        styleName={classnames('main', {
          'main-hide-mode': navigation.asideMode === EAsideNavMenusMode.Hide
        })}
        className="dte-clearfix"
      >
        {/* <TopNavBar /> */}
        <div
          styleName="content"
          // style={{ height: `calc(100vh - ${globalState.breadcrumb ? '117' : '67'}px)` }}
          style={{ height: `calc(100vh - 67px)` }}
        >
          <p>asdasdsada</p>
          {/* <RouteWithAuth /> */}
        </div>
      </div>
    </div>
  );
};

export default LayoutTwoColumn;
