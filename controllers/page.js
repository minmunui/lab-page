exports.renderMain = async (req, res, next) => {
    try {
        res.render('main', {
            title: 'NodeBird',
        });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}

exports.renderJoin = async (req, res, next) => {
    res.render('join', { title : '회원가입'})
}