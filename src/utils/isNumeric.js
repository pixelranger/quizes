export default function(value) {
    if (typeof value === 'undefined') {
        return false;
    }

    if (typeof value === 'number') {
        return true;
    }
    if (typeof value === 'string') {
        return !isNaN(value) && !isNaN(parseFloat(value));
    }

    return false;
}
