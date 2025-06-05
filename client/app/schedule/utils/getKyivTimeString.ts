function getKyivTimeString(date: Date | string | undefined): string {
  if (!date) {
    return "";
  }

  const parsedDate = date instanceof Date ? date : new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Kyiv",
  };

  return new Intl.DateTimeFormat("uk-UA", options).format(parsedDate);
}

export default getKyivTimeString;
