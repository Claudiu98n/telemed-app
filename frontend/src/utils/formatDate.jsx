export function formatDate(date) {
  if (date === null || typeof date == "undefined") return null;

  let newDate = date.split("T")[0];
  let newDateFormated = newDate.split("-");

  return `${newDateFormated[2]}.${newDateFormated[1]}.${newDateFormated[0]}`;
}

export function modalDate(date) {
  date = new Date(date);
  return date.toLocaleString();
}


// export function removeOffset(date) {
//   let formatedDate = new Date(date);

//   if (formatedDate.toString().includes("Mar 28")) {
//     formatedDate.setHours(formatedDate.getHours() + 1);
//   }

//   return formatedDate;
// }

// export function addOffsetBack(date) {
//   let formatedDate = new Date(date);

//   if (formatedDate.toString().includes("Mar 28")) {
//     formatedDate.setHours(formatedDate.getHours() - 1);
//   }

//   return formatedDate;
// }