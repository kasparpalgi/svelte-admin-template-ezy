/** @param {string} input */
export function shortenStringToXwords(input, maxLength = 70) {
    if (input.length <= maxLength) {
        return input;
    }
    let output = input.substr(0, maxLength);
    let lastSpaceIndex = output.lastIndexOf(' ');
    if (lastSpaceIndex > -1) {
        output = output.substr(0, lastSpaceIndex);
    } else if (output.length > maxLength) {
        output = output.substr(0, maxLength);
    }
    return output + '...';
}
