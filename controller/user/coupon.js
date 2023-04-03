const Coupon = require("../../model/admin/coupen");
const User = require("../../model/user/userModel");

exports.applyCoupon=async(req,res)=>{
    try {
        const isLogin=req.session.user_id;
        const user=await User.findById(isLogin);
        code=req.body.coupon.toLowerCase();
        const coupon=await Coupon.find({code:code});
        if(coupon.length!=0 && coupon[0].status){
            const replay=await user.applyCoupon(isLogin,code);
            if(replay=='exist'){
                req.flash('error',"Coupon already applied");
            }else if(replay=='expired'){
                req.flash('error','Coupon expired');
            }else if(replay=='min'){
                req.flash('error','You should shope for more to apply this coupon');
            }else{
                req.flash('success',"Coupon applied successfully");
            }
            res.redirect('back');
        }else{
            req.flash('error',"No coupen found");
            res.redirect('back');
        }
    } catch (error) {
        throw error
    }       
}