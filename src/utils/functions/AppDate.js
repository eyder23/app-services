export function validateDate(date) {
  if (date === null) {
    return false;
  }
  if (date === undefined) {
    return false;
  }
  if (date === "") {
    return false;
  }
  const mydate = new Date(date);
  if (mydate.toString() === "Invalid Date") {
    console.log("Invalid Date", date);
    return false;
  }
  return true;
}
