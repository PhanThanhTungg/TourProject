
import { Request, Response , NextFunction} from "express";
import streamUploadHepler from '../helper/streamUploadHepler';


export const uploadCloudSingle = async (req:Request,res:Response,next:NextFunction)=>{
  if(req["file"]){
    async function upload(req:Request) {
        let result = await streamUploadHepler(req["file"].buffer);
        req.body[req["file"].fieldname] = result["url"];
    }
    await upload(req);
  }
  next();
}

export const uploadFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log(req["files"])
  // [Object: null prototype] {
  //   avatar: [
  //     {
  //       fieldname: 'avatar',
  //       originalname: 'download (7).png',
  //       encoding: '7bit',
  //       mimetype: 'image/png',
  //       buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 c0 00 00 01 c2 08 06 00 00 00 20 81 a0 b9 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 20 00 ... 553316 more bytes>,
  //       size: 553366
  //     }
  //   ],
  //   audio: [
  //     {
  //       fieldname: 'audio',
  //       originalname: 'tiktokio.com_GdtsUWADFestnIaWnpKA.mp3',
  //       encoding: '7bit',
  //       mimetype: 'audio/mpeg',
  //       buffer: <Buffer 49 44 33 04 00 00 00 00 09 17 54 58 58 58 00 00 02 5f 00 00 03 64 65 73 63 72 69 70 74 69 6f 6e 00 5b 7b 22 6d 61 6b 65 22 3a 22 22 2c 22 76 69 64 65 ... 3690042 more bytes>,
  //       size: 3690092
  //     }
  //   ]
  // }
  if(req["files"]){
    for (const key in req["files"]) {
      req.body[key] = [];
  
      const array = req["files"][key];
      for (const item of array) {
        try {
          const result = await streamUploadHepler(item.buffer);
          req.body[key].push(result["url"]);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  next();
}
