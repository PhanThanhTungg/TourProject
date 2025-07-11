import { Request, Response } from "express";
import Order from "../../model/order.model";
import Tour from "../../model/tour.model";
import OrderItem from "../../model/order-item.model";

export const index = async (req: Request, res: Response) => {
  const info = req.body.info;
  const cart = req.body.cart;

  const dataOrder = {
    code: "",
    fullName: info.fullName,
    phone: info.phone,
    note: info.note,
    status: "initial",
  };

  const order = await Order.create(dataOrder);
  const orderId = order.dataValues.id;

  const code = `OD${String(orderId).padStart(8,'0')}`

  await Order.update({
    code: code
  }, {
    where: {
      id: orderId
    }
  });

  for(const item of cart){
    const dataItem = {
      orderId: parseInt(orderId),
      tourId: parseInt(item.tourId),
      quantity: item.quantity,
    };

    const tourInfo = await Tour.findOne({
      where: {
        id: parseInt(item.tourId),
        deleted: false,
        status: "active"
      },
      raw: true
    });

    dataItem["price"] = tourInfo["price"];
    dataItem["discount"] = tourInfo["discount"];
    dataItem["timeStart"] = tourInfo["timeStart"];

    await OrderItem.create(dataItem);
  }


  res.json({
    code: 200,
    orderCode: code
  });
};

export const success = async(req:Request, res: Response) =>{
  const orderCode = req.query.orderCode;

  const order = await Order.findOne({
    where: {
      code: orderCode,
      deleted: false,
    },
    raw: true,
  });

  const ordersItem = await OrderItem.findAll({
    where: {
      orderId: order["id"],
    },
    raw: true,
  });

  for (const item of ordersItem) {
    item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
    item["total"] = item["price_special"] * item["quantity"];

    const tourInfo = await Tour.findOne({
      where: {
        id: item["tourId"]
      },
      raw: true,
    });

    tourInfo["images"] = JSON.parse(tourInfo["images"]);

    item["image"] = tourInfo["images"][0];
    item["title"] = tourInfo["title"];
    item["slug"] = tourInfo["slug"];
  }

  order["total_price"] = ordersItem.reduce((sum, item) => sum + item["total"], 0);

  res.render("client/pages/order/success", {
    pageTitle: "Đặt hàng thành công",
    order: order,
    ordersItem: ordersItem
  });

}