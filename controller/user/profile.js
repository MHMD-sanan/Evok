const { default: mongoose } = require("mongoose");
const Order = require("../../model/user/order");
const User = require("../../model/user/userModel");

exports.viewProfile=async(req,res)=>{
    try {
        const isLogin=req.session.user_id;
        const user = await User.findById(isLogin);
        const data = await user.populate("cart.items.productId");
        res.render('../view/user/partials/profile/profile.ejs',{isLogin,cart:data.cart,user,address:user.address});
    } catch (error) {
        console.log(error);
    }
}

exports.userUpdate=async(req,res)=>{
    try {
        await User.findByIdAndUpdate(isLogin,{$set:{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }});
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

exports.editAddress2=async(req,res)=>{
    try {
        const id=req.body.addId;
        const data = await user.populate("cart.items.productId");

        const address=await User.aggregate([
            {$match:{"_id":mongoose.Types.ObjectId(isLogin)}},
            {$unwind:"$address"},
            {$match:{"address._id":mongoose.Types.ObjectId(id)}},
        ]);
        res.render('../view/user/partials/profile/editAddress.ejs',{ isLogin, cart: data.cart,address:address[0].address});
    } catch (error) {
        throw error
    }
}

exports.updateAddress2=async(req,res)=>{
    try {
        await user.updateAddress(req.body);
        res.redirect('/address')
    } catch (error) {
        throw error
    }
}

exports.address=async(req,res)=>{
    try {
        isLogin=req.session.user_id;
        user = await User.findById(isLogin);
        const data = await user.populate("cart.items.productId");
        res.render('../view/user/partials/profile/address.ejs',{isLogin,cart:data.cart,address:user.address,success:req.flash('message')})
    } catch (error) {
        throw error
    }
}

exports.removeAddress=async(req,res)=>{
    try {
        const isLogin=req.session.user_id;
        const user = await User.findById(isLogin);
        await user.removeAddress(req.body.addId);
        req.flash('message','Address Deleted Successfully')
        res.redirect('back');
    } catch (error) {
        console.log(error);
    }
}

exports.orders=async(req,res)=>{
    try {
        const isLogin=req.session.user_id;
        const order=await Order.find({user:isLogin});
        const user = await User.findById(isLogin);
        const data = await user.populate("cart.items.productId");
        res.render('../view/user/partials/profile/orders.ejs',{order,isLogin,cart:data.cart});
    } catch (error) {
        throw error
    }
}

exports.cancelOrder=async(req,res)=>{
    try {
        await Order.findByIdAndUpdate(req.body.orderId,{$set:{status:"Cancelled"}});
        res.redirect('back');
    } catch (error) {
        throw error
    }
}