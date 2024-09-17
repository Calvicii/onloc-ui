export function convertUnixToISO8601(unixTimestamp) {
  // Convert the Unix timestamp (seconds) to a Date object
  const date = new Date(unixTimestamp);

  // Extract date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date and time as yyyy-mm-ddThh:mm:ss
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
