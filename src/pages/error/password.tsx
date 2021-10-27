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
import React, { useState } from 'react';
import { DefaultButton, Icon, TextField } from '@fluentui/react';
import { trim } from 'lodash';

// import { useHistory } from 'react-router-dom';
// import { useI18N } from '@utils/i18n';
import flyLogo from '@assets/images/fly-logo.png';
import msLogo from '@assets/images/ms-logo.png';

import './password.module.scss';

const PasswordAuthorization = () => {
  // const intl = useI18N();

  const [errorMessage, seterrorMessage] = useState('');
  const [text, setText] = useState('');

  return (
    <div styleName="password-authorization-container">
      <div styleName="logo">
        <img src={flyLogo} alt="" />
      </div>
      <div styleName="content">
        <div styleName="ms-logo">
          <img src={msLogo} alt="" />
        </div>
        <div styleName="avatar">
          <Icon iconName="faUserShield" />
        </div>
        <div styleName="description">
          Your mailbox is executing migration, please enter your password for authentication. Your
          information is only used for migration and cannot be accessed by anyone.
        </div>
        <div styleName="form">
          <TextField
            styleName="input"
            type="password"
            label="Password"
            required
            placeholder="please input password"
            errorMessage={errorMessage}
            value={text}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => {
              setText(newValue!);
            }}
          />
          <DefaultButton
            text="Submit"
            // styleName="button"
            onClick={() => {
              if (!trim(text)) {
                seterrorMessage('please input password');
              } else {
                seterrorMessage('');
                // /password/:projectType/:projectID/:mappingID
                // http://10.2.2.181:8080/#/projects/{project.Id}/mappings/{mapping.Id}/credentials?type=0
              }
            }}
          />
        </div>
        <div styleName="tips">
          <Icon iconName="faExclamationTriangle" styleName="icon" />
          <span styleName="text">
            Password authorization is only used for migration, which is invalidated after the
            migration finished, and AvePoint will not be stored it.
          </span>
        </div>
      </div>
    </div>
  );
};
export default PasswordAuthorization;
