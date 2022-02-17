function changeIntoDateString(date, type) {
  if (!date) {
    return;
  }

  const formedDate = new Date(date);
  let fullMonth = formedDate.getMonth() + 1;
  let fullDate = formedDate.getDate();
  let fullHour = formedDate.getHours();
  let fullMinutes = formedDate.getMinutes();
  let result = "";

  switch (type) {
    case "full":
      result = formedDate.toLocaleString();
      break;
    case "date":
      if (fullMonth < 10) {
        fullMonth = `0${fullMonth}`;
      }

      if (fullDate < 10) {
        fullDate = `0${fullDate}`;
      }

      if (fullHour < 10) {
        fullHour = `0${fullHour}`;
      }

      if (fullMinutes < 10) {
        fullMinutes = `0${fullMinutes}`;
      }

      result = `${formedDate.getFullYear()}-${fullMonth}-${fullDate}`;
      break;
    case "time":
      result = `${fullHour}:${fullMinutes}`;
      break;
    default:
      break;
  }

  return result;
}

export default changeIntoDateString;
