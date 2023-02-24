export function isValidDate(dateString) {
    // Parse the input string into a date object
    const date = new Date(dateString);
  
    // Check if the parsed date is a valid date
    if (isNaN(date.getTime())) {
      return false;
    }
  
    // Check if the input string matches the format "yyyy-mm-dd"
    const [year, month, day] = dateString.split('-');
    if (year.length !== 4 || month.length !== 2 || day.length !== 2) {
      return false;
    }
  
    // Check if the input string represents the same date as the parsed date object
    const isoDate = date.toISOString().slice(0, 10);
    return isoDate === dateString;

  }

  export function compareDate( d2) {

    let today = new Date().toISOString().slice(0, 10);

    console.log(today, d2);

    today = new Date(today) ;
    const date2 = new Date(d2);
    //  console.log(today.getTime() , date2.getTime());
    if(today.getTime() > date2.getTime())return false ; 

    return true ;
  }
  // export {isValidDate , compareDate} ; 