
export const parseDate = (dateString: string, format: string) => {
    const parts = dateString.split('-');
    let day, month, year;
    if (parts.length === 3) {
        if (format === 'dd-mm-yy') {
            [day, month, year] = parts.map((part) => parseInt(part, 10));
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month - 1, day);
            }
        }
        else if (format === 'mm-dd-yy') {
            [month, day, year] = parts.map((part) => parseInt(part, 10));
            if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
                return new Date(year, month - 1, day);
            }
        }

    }
    // Return a default value if parsing fails
    return new Date();
}

