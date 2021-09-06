module.exports = {
  parse(date) {
    date = new Date(date)

    function lp(str, length) {
      str = str.toString()
      while (str.length < length) {
        str = "0" + str;
      }
      return (str);
    }
    const year = date.getFullYear();
    const month = lp((date.getMonth() + 1), 2);
    const day = lp(date.getDate(), 2);
    const hour = lp(date.getHours(), 2);
    const minute = lp(date.getMinutes(), 2);
    const second = lp(date.getSeconds(), 2);

    return ({
      "datetime": `${year}-${month}-${day} ${hour}:${minute}`,
      "date": `${year}-${month}-${day}`,
      "slashDate": `${year}/${month}/${day}`,
      "time": `${hour}:${minute}`,
      "timestamp": date.getTime(),
      "ISO": date.toISOString(),
      "year": year,
      "month": month,
      "day": day,
      "hour": hour,
      "minute": minute,
      "second": second,
    })
  },
  getLocalISOString(date) {
    return (this.parse(date).ISO);
  },

  getDateTimeString(date) {
    return (this.parse(date).datetime)
  },
  getTimestamp(date) {
    return (this.parse(date).timestamp);
  },

  getTime(date) {
    return (this.parse(date).time);
  },

  getSlashDate(date) {
    return (this.parse(date).slashDate);
  },
  getDate(date) {
    return (this.parse(date).date);
  },

  getYear(date) {
    return (this.parse(date).year);
  },
  getMonth(date) {
    return (this.parse(date).year);
  },
  getDay(date) {
    return (this.parse(date).day);
  },
  getHour(date) {
    return (this.parse(date).hour);
  },
  getMinute(date) {
    return (this.parse(date).minute);
  },
  getSecond(date) {
    return (this.parse(date).second);
  }
}
