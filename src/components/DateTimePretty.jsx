import React, { Component } from 'react';
import DateTime from './DateTime';

const declOfNum = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

const minsTitles = ['минута', 'минуты', 'минут'];
const hoursTitles = ['час', 'часа', 'часов'];
const daysTitles = ['день', 'дня', 'дней'];

const MIN = 1000 * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 24;

const dateTimeHOC = WrappedComponent => {
  return class extends Component {
    getRelativeTime = () => {
      const currentDate = new Date();
      const componentDate = new Date(this.props.date);
      const timeDiff = currentDate - componentDate;

      const minsDiff = Math.floor(timeDiff / MIN);
      const hoursDiff = Math.floor(timeDiff / HOUR);
      const daysDiff = Math.floor(timeDiff / DAY);

      if (hoursDiff < 1) {
        return `${minsDiff} ${declOfNum(minsDiff, minsTitles)} назад`;
      } else if (daysDiff < 1) {
        return `${hoursDiff} ${declOfNum(hoursDiff, hoursTitles)} назад`;
      }
      return `${daysDiff} ${declOfNum(daysDiff, daysTitles)} назад`;
    };

    render() {
      const { date } = this.props;
      return <WrappedComponent date={this.getRelativeTime(date)} />;
    }
  };
};

const DateTimePretty = dateTimeHOC(DateTime);

export default DateTimePretty;
