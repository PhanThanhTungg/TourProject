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