import axios from "axios";
import { ethers } from "ethers";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import abi from "../abi/Freelancer.json";
import { changeChain } from "../utils/extra";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import handler_New_Freelancer from "../pages/api/become_freelancer";
import { SanityAssetDocument } from "@sanity/client";
import { client_Sanity } from "../sanity";
import {FaCodepen} from "react-icons/fa"
 
interface I_Freelancer {
  name_freelancer: string;
  image?: File;
}
const runABI = abi.abi;
const contractAddress: string = "0xB06581365d91757B44810594CCBAdC6F275d3c4B";

const Navbar = () => {
  const [validateMyStatus, setvalidateMyStatus] = useState<boolean>(false);
  const [accountAddress, setAccountAddress] = useState<string | null>();
  const [imageAsset, setImagesAssets] = useState<SanityAssetDocument>();

  const [chain, setchain] = useState<string | null>();
  const [name_freelancer, setname_freelancer] = useState<String>("");
  const [image, setimage] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  const { ethereum } = window as any;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, runABI, signer);

  const check_Wallet_render = async () => {
    if (ethereum) {
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      const chainId = await ethereum.request({ method: "eth_chainId" });
      if (chainId != "0x4") {
        changeChain();
      } else {
        setchain((prev) => "Rinkeby");
      }

      const response = accounts[0];
      setAccountAddress(response);
    }
  };

  const checkWallet = async () => {
    if ((window as any).ethereum) {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      const response = accounts[0];
      setAccountAddress(response);
    }
  };

  const getWhitelistedFreelancer = async () => {
    try{

      
      const listedJobs = await contract.whitelistF({ gasLimit: 100000 });
      await listedJobs.wait();
    }catch(err){
      console.error(err,"Something went wrong please try again after some time")
  }
  };

  const checkMyStatusAsFreelancer = async () => {
    const listedJobs = await contract.checkWhitelistedF({ gasLimit: 100000 });
    setvalidateMyStatus(listedJobs);
    console.log(validateMyStatus, "lets check our status");
  };

  const disconnectWallet = async () => {
    const { ethereum } = window as any;
    try {
      setAccountAddress(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    check_Wallet_render();
    checkMyStatusAsFreelancer();
  }, []);


  const handle_NEW_FREEELANCER = async () => {
    const selectedImage: any = image;
    const fileTypes = ["video/mp4", "image/jpg", "image/jpeg", "image/png"];

    await client_Sanity.assets
      .upload("image", selectedImage, {
        contentType: selectedImage.type,
        filename: selectedImage.name,
      })
      .then((document) => {
        setImagesAssets(document);
        console.log(document, "this is uploaded image slug");
      })
      .catch((error) => {
        console.log("Upload failed:", error.message);
      });

    console.log(imageAsset&&imageAsset);
    const data = {
      _type: "freelancer",
      name: name_freelancer,
      walletAddress: accountAddress,
      image: {
        asset: {
          _ref: imageAsset?._id,
          _type: "reference",
        },
        _type: "image",
      },
    };
 

    const result = await axios.post("/api/become_freelancer", data);
  };

  const close_With_New_Freelancer = async() => {
    try{
      getWhitelistedFreelancer();
      handle_NEW_FREEELANCER();
      setname_freelancer((prev) => "");
      setOpen((prev) => !prev);
    }catch(err){
      console.log(err);
  }
  };

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  const handleClickOpen = () => {
    setOpen((prev) => true);
  };

  return (
    <div className="bg-transparent fixed w-full z-10 top-0  ">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to become active freelancer please make sure to enter your
            name and profile image
          </DialogContentText>
          <div className="flex  justify-between gap-10">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={name_freelancer}
              onChange={(e) => setname_freelancer(e.target.value)}
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              // label="Image"
              type="file"
              fullWidth
              // value={image}
              onChange={(e: any) => setimage(e.target.files[0])}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={close_With_New_Freelancer}>Register</Button>
        </DialogActions>
      </Dialog>

      <div className="backdrop-blur-sm w-full h-full flex items-center justify-between  bg-black/50 p-2">
      <Link href="/">
        <div>
          <div className="bg-yellow-600 p-2 rounded-full"><FaCodepen/></div> 
        </div>
        </Link>

        <div className="flex justify-center text-white items-center gap-10 mr-20">
          <div className="cursor-pointer"> Post Job</div>
          <div className="cursor-pointer">
            <Link href="/Hire_freelancer"> Hire Freelancer</Link>
          </div>
          <Link href="/Projects">
            <div className="cursor-pointer">Projects</div>
          </Link>

          {!validateMyStatus &&
          <div className="cursor-pointer" onClick={handleClickOpen}>
            Become a Freelancer
          </div>
          }
          <div className="hover:bg-red-600 transition-all duration-300 ease-in-out rounded-tl-2xl bg-red-600 text-white p-2 cursor-pointer ">
            {!accountAddress ? (
              <div onClick={checkWallet}>Connect Wallet</div>
            ) : (
              <div onClick={disconnectWallet}>
                {accountAddress.substring(0, 6)}.....
                {accountAddress.substring(35)}
              </div>
            )}
          </div>
          <div className="hover:bg-red-600 transition-all duration-300 ease-in-out rounded-tl-2xl  bg-red-600 text-white p-2 cursor-pointer ">
            <div onClick={changeChain}>{chain}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
