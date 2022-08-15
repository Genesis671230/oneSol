import { NextApiRequest,NextApiResponse } from "next";
import { client_Sanity } from "../../sanity";
import {basename} from 'path'
import {createReadStream} from 'fs'
import { useState } from "react";

export default async function handler_New_Freelancer(req:NextApiRequest, res:NextApiResponse) {
  
  
  

  switch (req.method) {
    case "POST":
      const freelancer_data = req.body;
      



      console.log(req.body);
     
        try {
          const data = await client_Sanity.create(freelancer_data)
              console.log(`Todo was created, document ID is ${data?._id}`);
          res.status(200).json({ msg: `Todo was created, document ID is  `} );
        } catch (err) {
          console.error(err);
          res.status(500).json({ msg: "Error, check console" });
        }
  
        break;
    }
  }