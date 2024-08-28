export function calculateTimeDifference(startTime:string, endTime:string) {
    // Helper function to parse time strings into Date objects
    function parseTime(timeString:string) {
        const [time, modifier] = timeString.split(' ');
        let [hours, minutes] = time.split(':').map(Number);

        if(!hours || modifier==''){
            return 0;
        }

        if (modifier === 'PM' && hours !== 12) {
            hours += 12;
        }
        if (modifier === 'AM' && hours === 12) {
            hours = 0;
        }

        const date = new Date();
        date.setHours(hours, minutes || 0, 0, 0);
        return date;
    }

    const startDate:any = parseTime(startTime);
    const endDate:any = parseTime(endTime);

    if(!startDate || !endDate){
        return 0
    }

    // Handle cases where the end time is past midnight (the next day)
    if (endDate < startDate) {
        endDate.setDate(endDate.getDate() + 1);
    }

    // Calculate the difference in milliseconds
    const differenceInMillis = endDate - startDate;

    // Convert the difference to hours and minutes
    const differenceInMinutes = differenceInMillis / (1000 * 60);
    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    //return `${hours} hour(s) and ${minutes} minute(s)`;
    return hours;
}