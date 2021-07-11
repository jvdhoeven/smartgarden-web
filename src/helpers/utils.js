export const bytesToString = (data) => {
    return String.fromCharCode.apply(null, new Uint8Array(data));
};

export const stringToBytes = (data) => {
    var array = new Uint8Array(data.length);
    for (var i = 0, l = data.length; i < l; i++) {
        array[i] = data.charCodeAt(i);
     }
     return array.buffer;
};