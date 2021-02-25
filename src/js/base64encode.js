function enc64(ascii){
    const buff = Buffer.from(ascii, 'utf-8');
    const base64 = buff.toString('base64');
    return base64;
};

module.exports = {enc64};