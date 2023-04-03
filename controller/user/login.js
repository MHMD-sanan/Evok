const { find } = require('../../model/admin/product');
const User = require('../../model/user/userModel')

const loadLogin = (req, res) => {
    res.render('../view/user/partials/login/login.ejs')
}

const userverification = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user!=null && req.body.password === user.password && user.status==true) {
            req.session.user_id = user._id;
            res.redirect('/');   
        } else {
            console.log('else worked');
            res.render('../view/user/partials/login/login.ejs', { wrong: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error.message);
        console.log('catch worked in login.js');
    }
}

const loadHome = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.session.user_id });
        const cart=await User.findById(req.session.user_id);

        if(userData.status==true){
            req.session.user=userData.id;
            isLogin=req.session.user_id
            res.render('../view/user/home.ejs', { isLogin,cart:cart.cart })
        }else{
            req.session.user_id=false;
            res.redirect('/');
        }
    } catch (error) {
        res.render('../view/user/home.ejs')
    }
}

module.exports={
    loadLogin,userverification,loadHome
}