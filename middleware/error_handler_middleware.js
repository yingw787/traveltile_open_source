const errorHandlerMiddleware = function(err, req, res, next) {
    const status = err.status || 500;
    const errObj = {message: err.message};
    errObj.error = process.env.NODE_ENV === 'development' ? err : {};
    console.log('errObj', errObj);
    res.status(status).render('error', errObj); // TODO: should I keep this line? A: YES I SHOULD KEEP THIS LINE BECAUSE WITHOUT IT THE APP RENDERS VERY WEIRDLY
};

// TODO: Resolve this error: errObj { message: 'Failed to lookup view "error" in views directory "/Users/yingwang/javascript_projects/traveltile_2/views"',
// error: {} }
// Deleted views directory and now it throws error upon failed REST API call.
// TODO: Delete views directory and replace within app.js

module.exports = errorHandlerMiddleware;
