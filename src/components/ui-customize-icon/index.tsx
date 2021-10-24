import React from 'react';
import {
  faAngleLeft,
  faAngleRight,
  faArchive,
  faArrowLeft,
  faArrowRight,
  faChartPie,
  faCog,
  faChevronRight,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CustomizeIcons: { [key: string]: string | JSX.Element } = {
  faAngleLeft: <FontAwesomeIcon icon={faAngleLeft} />,
  faAngleRight: <FontAwesomeIcon icon={faAngleRight} />,
  faArchive: <FontAwesomeIcon icon={faArchive} />,
  faArrowLeft: <FontAwesomeIcon icon={faArrowLeft} />,
  faArrowRight: <FontAwesomeIcon icon={faArrowRight} />,
  faCog: <FontAwesomeIcon icon={faCog} />,
  faChartPie: <FontAwesomeIcon icon={faChartPie} />,
  faChevronRight : <FontAwesomeIcon icon={faChevronRight} />,
  faChevronLeft: <FontAwesomeIcon icon={faChevronLeft} />
};

export default CustomizeIcons;
