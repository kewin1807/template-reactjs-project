import React, { useEffect, useState } from 'react';
// import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { createIntl, createIntlCache, IntlProvider, IntlShape } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { createTheme, Customizer, Fabric, initializeIcons, ISettings } from '@fluentui/react';
import { initializeFileTypeIcons } from '@uifabric/file-type-icons';
import { registerIcons } from '@uifabric/styling';
import { CustomizeIcons } from '@components/ui-customize-icon';

import { LayoutContainer } from '@layouts';
import createStore from '@redux/store';

import 'office-ui-fabric-core/dist/css/fabric.min.css';
import '@styles/globals.scss';

export const reduxStore = createStore();

const cache = createIntlCache();

const initializeFluentUI = async () => {
  // init fluent ui icon, https://github.com/microsoft/fluentui/wiki/Using-icons
  initializeIcons();
  initializeFileTypeIcons();
  // registering custom icons
  registerIcons({
    icons: CustomizeIcons
  });
  const themeConfig: ISettings = createTheme({
    // You can also modify certain other properties such as fontWeight if desired
    defaultFontStyle: {
      fontFamily: 'Open Sans; Segoe UI; Helvetica Neue; Helvetica; Arial; sans-serif'
    }
  });
  return themeConfig;
};

export default function APPRoot() {
  const [theme, setTheme] = useState<ISettings>();

  useEffect(() => {
    const fetchThemeDataJSON = async () => {
      const themeConfig = await initializeFluentUI();
      setTheme(themeConfig);
    };
    fetchThemeDataJSON();
  }, []);

  const [intl, setIntl] = useState<IntlShape>();

  useEffect(() => {
    const fetchDefaultLocale = async () => {
      // const locale: string = getLanguage(Context.user?.Language);
      const locale: string = 'en';
      const localeFiles: { [key: string]: A } = await import(`../locales/en.json`);
      const encodeLocaleFiles: { [key: string]: A } = {};
      Object.keys(localeFiles.default).forEach(key => {
        encodeLocaleFiles[key] = localeFiles.default[key].replace(new RegExp("'{", 'g'), `''{`);
        encodeLocaleFiles[key] = encodeLocaleFiles[key].replace(new RegExp("}'", 'g'), `}''`);
      });

      const intlConfig = createIntl(
        {
          locale,
          messages: { ...encodeLocaleFiles },
          defaultLocale: locale
        },
        cache
      );

      //   if (locale === 'ja') {
      //     const localData = await import('date-fns/locale/ja');
      //     registerLocale('ja', localData.default);
      //     setDefaultLocale('ja');
      //   } else {
      //     const localData = await import('date-fns/locale/en-US');
      //     registerLocale('en-US', localData.default);
      //     setDefaultLocale('en-US');
      //   }
      setIntl(intlConfig);
    };
    fetchDefaultLocale();
  }, []);

  if (!theme || !intl) return null;

  return (
    <ReduxProvider store={reduxStore}>
      <IntlProvider {...intl}>
        <Customizer settings={{ theme }}>
          <Fabric applyTheme>
            <HashRouter>
              <LayoutContainer />
            </HashRouter>
          </Fabric>
        </Customizer>
      </IntlProvider>
    </ReduxProvider>
  );
}
