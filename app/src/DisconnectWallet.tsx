import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { PagesPaths } from "./Navigator";
interface ButtonProps {
  userAddress: string;
  wallet: BeaconWallet;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
}

const randomPicture = `https://avatars.dicebear.com/api/avataaars/${Math.random()}.svg`;

const DisconnectButton = ({
  userAddress,
  wallet,
  setUserAddress,
  setUserBalance,
}: ButtonProps): JSX.Element => {
  const navigate = useNavigate();

  const disconnectWallet = async (): Promise<void> => {
    setUserAddress("");
    setUserBalance(0);
    console.log("disconnecting wallet");
    await wallet.clearActiveAccount();
    navigate(PagesPaths.WELCOME);
  };

  return (
    <IconButton color="inherit" sx={{ p: 0.5 }}>
      <Avatar src={randomPicture} alt="My Avatar" /> {userAddress}
      <button className="button" onClick={disconnectWallet}>
        <i className="fas fa-times"></i>&nbsp; Disconnect wallet
      </button>
    </IconButton>
  );
};

export default DisconnectButton;
