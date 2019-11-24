module.exports.setFlash=function(req,res){
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}