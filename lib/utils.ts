export const convertToSnakeCaseUppercase = (input: string): string => {
    let cleanedInput = input.replace(/[^a-zA-Z0-9]/g, '');
    let words = cleanedInput.split(/(?=[A-Z])/).map(word => word.trim());
    return words.join('_').toUpperCase();
}