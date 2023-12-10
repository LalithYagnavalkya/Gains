export const formatNumber = (num: number) => {
    let temp = String(num)
    // Remove any non-digit characters from the input (e.g., commas)
    const sanitizedValue = temp.replace(/[^0-9]/g, '');
    // Format the number with commas
    return sanitizedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}