import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  DirectionalHint,
  Icon,
  INavLink,
  INavLinkGroup,
  Nav,
  TooltipDelay,
  TooltipHost
} from '@fluentui/react';
import classNames from 'classnames';

import { setAsideNavMode } from '@redux/action/creators';
import { useI18N } from '@utils/i18n';

import './index.module.scss';




export enum EAsideNavMenusMode {
  Show,
  Hide
}

interface IAsideNavMenusProps {
  styleName?: string;
  mode?: EAsideNavMenusMode;
}

enum EParentMenu {
  Dashboard = 'navDashboard',
  Settings = 'navSettings'
}

enum ESettingsChildMenu {
  Tag = 'navChildSettingsTag',
  Migration = 'navChildSettingsMigration'
}

export const AsideNavMenus: React.FunctionComponent<IAsideNavMenusProps> = ({
  styleName,
  mode
}: IAsideNavMenusProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const intl = useI18N();
  const navRef = useRef<HTMLElement>(null);
  const [selectedKey, setSelectedKey] = useState<string>(EParentMenu.Dashboard);
  const onClickLink = useCallback(
    (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
      ev!.stopPropagation();
      ev!.cancelable = true;
      ev!.isDefaultPrevented();
      ev!.preventDefault();
      if (item!.url) {
        history.push(item!.url);
      }
    },
    [history]
  );
  const navLinkGroups: INavLinkGroup[] = useMemo(
    () => [
      {
        isGroupCollapsed: false,
        links: [
          {
            name: intl.formatMessage({ id: 'layouts.aside-nav.dashboard' }),
            icon: 'faChartPie',
            url: '/dashboard',
            key: EParentMenu.Dashboard,
            onClick: onClickLink
          },
          {
            name: intl.formatMessage({ id: 'layouts.aside-nav.settings' }),
            icon: 'faCog',
            url: '',
            key: EParentMenu.Settings,
            disabled: true,
            isExpanded: true,
            'data-selected': selectedKey.indexOf('Settings') > -1 ? 'settingSelected' : undefined,
            links: [
              {
                name: intl.formatMessage({ id: 'layouts.aside-nav.tagManagement' }),
                icon: 'faArrowRight',
                url: '/settings/tag',
                key: ESettingsChildMenu.Tag,
                onClick: onClickLink
              },
              {
                name: intl.formatMessage({ id: 'layouts.aside-nav.migrationPolicy' }),
                icon: 'faArrowRight',
                url: '/settings/migration',
                key: ESettingsChildMenu.Migration,
                onClick: onClickLink
              }
            ]
          }
        ]
      }
    ],
    [onClickLink, selectedKey, intl]
  );
  useEffect(() => {
    const pathName = history.location.pathname;
    if (pathName.indexOf('/dashboard') > -1) {
      setSelectedKey(EParentMenu.Dashboard);
    } else if (pathName.indexOf('/settings') > -1) {
      if (pathName.indexOf('/settings/tag') > -1) {
        setSelectedKey(ESettingsChildMenu.Tag);
      } else if (
        pathName.indexOf('/settings/migration') > -1 ||
        pathName.indexOf('/user-mapping') > -1
      ) {
        setSelectedKey(ESettingsChildMenu.Migration);
      }
    }
  }, [history.location.pathname, intl]);
  const NormalAsideComponent: FunctionComponent = () => (
    <div styleName="aside-container" className={styleName}>
      <div styleName="logo" onClick={() => dispatch(setAsideNavMode(EAsideNavMenusMode.Hide))}>
        <div styleName="img" />
        <Icon iconName="faChevronLeft" styleName="collapse" />
      </div>

      <nav styleName="menu" ref={navRef}>
        <Nav groups={navLinkGroups} selectedKey={selectedKey} />
      </nav>
    </div>
  );
  const TinyAsideComponent: FunctionComponent = () => {
    const defaultTooltipVisable: { [key: string]: boolean } = {};
    navLinkGroups[0].links.forEach(({ key }) => {
      defaultTooltipVisable[key!] = false;
    });
    return (
      <div styleName="aside-container-tiny" className={styleName}>
        <div
          styleName="logo"
          onClick={() => {
            dispatch(setAsideNavMode(EAsideNavMenusMode.Show));
          }}
        >
          {mode === EAsideNavMenusMode.Hide ? (
            <Icon iconName="faChevronRight" styleName="collapse" />
          ) : (
            <Icon iconName="faChevronLeft" styleName="collapse" />
          )}
        </div>

        <nav styleName="menu">
          {navLinkGroups[0].links.map((navLink: INavLink) => (
            <TooltipHost
              key={navLink.key}
              tooltipProps={{
                onRenderContent: () => (
                  <ul styleName="sub-container">
                    <li
                      key={navLink.key}
                      styleName="sub-title"
                      onClick={e => onClickLink(e, navLink)}
                    >
                      {navLink.name}
                    </li>
                    {navLink.links && (
                      <li styleName="sub-link-container">
                        {navLink.links?.map(subLink => (
                          <div
                            key={subLink.key}
                            styleName={classNames(`sub-link`, {
                              'is-active':
                                history.location.pathname === subLink.url ||
                                history.location.pathname.indexOf('/settings/migration') > -1 ||
                                history.location.pathname.indexOf('/user-mapping') > -1
                            })}
                            onClick={e => onClickLink(e, subLink)}
                          >
                            <Icon iconName={subLink.icon} styleName="icon" />
                            {subLink.name}
                          </div>
                        ))}
                      </li>
                    )}
                  </ul>
                )
              }}
              directionalHint={DirectionalHint.rightTopEdge}
              calloutProps={{
                isBeakVisible: false
              }}
              delay={TooltipDelay.zero}
              // onTooltipToggle={(isTooltipVisible: boolean) => {
              //   setIsTooltipVisibleValue({
              //     ...defaultTooltipVisable,
              //     [navLink.key!]: isTooltipVisible,
              //   });
              // }}
              styleName="tiny-aside-sub-menu"
            >
              <div
                key={navLink.key}
                styleName={classNames('nav-icon', {
                  'is-show-sublinks':
                    navLink.url === history.location.pathname ||
                    (navLink.url === '/project/all-list' &&
                      history.location.pathname.indexOf('/project') > -1) ||
                    navLink.links?.filter(
                      link =>
                        link.url === history.location.pathname ||
                        (link.url === '/settings/migration/exchange-mapping' &&
                          (history.location.pathname.indexOf('/settings/migration') > -1 ||
                            history.location.pathname.indexOf('/user-mapping') > -1))
                    ).length
                })}
                onClick={() => {
                  const url = navLink.url ? navLink.url : navLink.links![0].url;
                  history.push(url);
                }}
              >
                <Icon iconName={navLink.icon} styleName="icon" />
              </div>
            </TooltipHost>
          ))}
        </nav>
      </div>
    );
  };
  return mode === EAsideNavMenusMode.Hide ? <TinyAsideComponent /> : <NormalAsideComponent />;
};
export default AsideNavMenus;
