/** ******************************************************************
 *
 *  PROPRIETARY and CONFIDENTIAL
 *
 *  This file is licensed from, and is a trade secret of:
 *
 *                   AvePoint, Inc.
 *                   525 Washington Blvd, Suite 1400
 *                   Jersey City, NJ 07310
 *                   United States of America
 *                   Telephone: +1-201-793-1111
 *                   WWW: www.avepoint.com
 *
 *  Refer to your License Agreement for restrictions on use,
 *  duplication, or disclosure.
 *
 *  RESTRICTED RIGHTS LEGEND
 *
 *  Use, duplication, or disclosure by the Government is
 *  subject to restrictions as set forth in subdivision
 *  (c)(1)(ii) of the Rights in Technical Data and Computer
 *  Software clause at DFARS 252.227-7013 (Oct. 1988) and
 *  FAR 52.227-19 (C) (June 1987).
 *
 *  Copyright © 2021 AvePoint® Inc. All Rights Reserved.
 *
 *  Unpublished - All rights reserved under the copyright laws of the United States.
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { DefaultButton } from '@fluentui/react';

import { useI18N } from '@utils/i18n';

import './styles.module.scss';

const PageAccessDenied = () => {
  const intl = useI18N();
  const history = useHistory();

  const ERROR_MESSAGES = {
    CODE_4XX_INFO: intl.formatMessage({ id: 'pages.error.access-denied.title' }),
    CODE_4XX_DESCRIPTION: intl.formatMessage({ id: 'pages.error.access-denied.description' })
  };

  return (
    <div styleName="error-page">
      <div styleName="auth" />
      <p styleName="info">{ERROR_MESSAGES.CODE_4XX_INFO}</p>
      <p styleName="desc">{ERROR_MESSAGES.CODE_4XX_DESCRIPTION}</p>
      <DefaultButton
        styleName="back"
        onClick={() => {
          history.push('/logout');
        }}
      >
        {intl.formatMessage({ id: 'pages.error.access-denied.signIn' })}
      </DefaultButton>
    </div>
  );
};

export default PageAccessDenied;
