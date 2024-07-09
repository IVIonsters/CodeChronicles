require('crypto').randomBytes(32, (err, buffer) => {
    let token = buffer.toString('hex');
    console.log(token);
});