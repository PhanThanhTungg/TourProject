import { Request, Response } from "express";
import Order from "../../model/order.model";

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


  res.json({
    code: 200,
    orderCode: code
  });
};