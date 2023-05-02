const PayService = require("../services/pay.service");
const ItemService = require("../services/item.service");
const DetailOrderService = require("../services/detailOrder.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const bcrypt = require('bcryptjs');

exports.createOrder = async (req, res, next) => {
    try {
        let arraypay = [];
        // let arrayItem = [];

        const payService = new PayService(MongoDB.client);
        const detailOrderService = new DetailOrderService(MongoDB.client);
        const itemService = new ItemService(MongoDB.client);
        // arrayItem = await itemService.find({});
        const itemDetail = req.body.itemsCart ;
        // console.log(arrayItem)
        const document = await payService.create(req.body);
        arraypay = await payService.find({});
        // return res.send(arraypay);
        const id_detailOrder = arraypay[arraypay.length - 1]._id;
        // console.log(id_detailOrder)

        for (let index = 0; index < itemDetail.length; index++) {
            const dataDetail = {
                idhd: id_detailOrder,
                tensp: itemDetail[index].name,
                masp: itemDetail[index].id,
                soluong: itemDetail[index].quantity,
                size: itemDetail[index].size,
                sugar: itemDetail[index].sugar,
                price: itemDetail[index].price,
                totalprice: (itemDetail[index].price * itemDetail[index].quantity),
                picture: itemDetail[index].image,
            }
            const kq = await detailOrderService.create(dataDetail);
            // console.log(dataDetail)
            // console.log(dataDetail)
            // console.log(itemDetail[index].id)
            
            // for(let i=0; i < itemDetail.length; i++) {
            //     if(arrayItem[i]._id == dataDetail.masp) {
            //         arrayItem[i].quantity = arrayItem[i].quantity - dataDetail.soluong;
            //     }
            // }
        
        }
        
        return res.send('Da them thanh cong don hang');
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while create a payment")
        );
    }
};
exports.findAll = async (req, res, next) => {
    try {
        let allOrders = [];
        const payService = new PayService(MongoDB.client);
        
        const detailOrderService = new DetailOrderService(MongoDB.client);
        const orders = await await payService.find({});
        // console.log(orders.length)
        if (orders.length > 0) {
            for (let index = 0; index < orders.length; index++) {
                const order = orders[index];
                const detailProducts = await detailOrderService.findDetailOrderById(order._id)
                const OrderData = {
                    id: order._id,
                    thoigian: order.thoigian,
                    nameKH: order.nameKH,
                    address: order.address,
                    sdt: order.sdt,
                    // sugar: order.sugar,
                    trangthai: order.trangthai,
                    products: detailProducts,
                    tongtien: order.tongtien,
                    ghichu: order.ghichu,
                    methodPay: order.methodPay,
                    deliveryTime: order.deliveryTime,
                    TongTien: order.TongTien,
                }
                // console.log(OrderData.products);
                allOrders[index] = OrderData
            }

            return res.send(allOrders)
        }
        else {
            return res.send(true)
        }

    } catch (error) {
        console.log(error)
        return next(new ApiError(500, `Erorr  retrieving  product with id=${req.params.id}}`));
    }
};
exports.findOrderByEmail = async (req, res, next) => {
    // console.log(req.params.email);
    try {
        let allOrders = [];
        const payService = new PayService(MongoDB.client);
        
        const detailOrderService = new DetailOrderService(MongoDB.client);
        const orders = await payService.findOrderByEmail(req.params.email);
        // console.log(orders.length)
        if (orders.length > 0) {
            for (let index = 0; index < orders.length; index++) {
                const order = orders[index];
                const detailProducts = await detailOrderService.findDetailOrderById(order._id)
                const OrderData = {
                    id: order._id,
                    thoigian: order.thoigian,
                    nameKH: order.nameKH,
                    address: order.address,
                    sdt: order.sdt,
                    // sugar: order.sugar,
                    trangthai: order.trangthai,
                    products: detailProducts,
                    tongtien: order.tongtien,
                    ghichu: order.ghichu,
                    methodPay: order.methodPay,
                    deliveryTime: order.deliveryTime,
                    TongTien: order.TongTien,
                }
                // console.log(OrderData.products);
                allOrders[index] = OrderData
            }

            return res.send(allOrders)
        }
        else {
            return res.send(true)
        }

    } catch (error) {
        console.log(error)
        return next(new ApiError(500, `Erorr  retrieving  product with id=${req.params.id}}`));
    }
};
exports.cancleOrder = async (req, res, next) => {

    try {
        // console.log(req.body.idhd);
        const payService = new PayService(MongoDB.client);
        const detailOrderService = new DetailOrderService(MongoDB.client);
        const order = await payService.findOrderById(req.body.idhd);
        // console.log(order)
        if (order) {
            const resultDeleteOrder = await payService.deleteOrdered(req.body.idhd);
            const resultDeleteDetailOrder = await detailOrderService.deleteDetailOrder(req.body.idhd);
            if (resultDeleteOrder && resultDeleteDetailOrder > 0) {
                res.send('Đơn hàng đã được hủy!');
            }
            else{
                res.send('xoa khong thanh cong')
            }

        }
        else {
            res.send('k tim thay hoa don')
        }

    } catch (error) {
        console.log(error)
        return next(new ApiError(500, `Erorr  retrieving  product with id=${req.params.id}}`));
    }

}
exports.update = async (req, res, next) => {
    
    try{
        const payService = new PayService(MongoDB.client);
        const document = await payService.update(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Order not found"));
        }
        return res.send({message: "Trạng thái: Đang Giao Hàng!"});
    } catch(error) {
        return next(new ApiError(500, `Error updating item with id=${req.params.id}`));
    }
};
exports.backStatus = async (req, res, next) => {
    
    try{
        const payService = new PayService(MongoDB.client);
        const document = await payService.backStatus(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Order not found"));
        }
        return res.send({message: "Trạng thái: Chờ xác nhận!"});
    } catch(error) {
        return next(new ApiError(500, `Error updating item with id=${req.params.id}`));
    }
};

exports.doanhthu = async (req, res, next) => {
    try {
        let doanhthuthang = 0;
        const payService = new PayService(MongoDB.client);
        const document = await payService.find({});
        // const datenow = Date().parseInt;
        // const dateByM = parseInt.datenow;
        // console.log(datenow)
        for(let i=0; i < document.length; i++) {
            if(document[i].trangthai == 'Dang giao hang') {
                // dateByM = datenow - document[i].thoigian;
                // console.log(dateByM)
                doanhthuthang = doanhthuthang + document[i].TongTien;
            }
        }
        // console.log(doanhthuthang)
        return res.send(`${doanhthuthang}`);
    } catch(error) {
        console.log(error);
    }
}