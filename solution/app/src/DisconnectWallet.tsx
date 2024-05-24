import { Logout } from "@mui/icons-material";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { PagesPaths } from "./Navigator";
interface ButtonProps {
  userAddress: string;
  userBalance: number;
  wallet: BeaconWallet;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
}

const DisconnectButton = ({
  userAddress,
  userBalance,
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
    navigate(PagesPaths.CATALOG);
  };

  return (
    <ButtonGroup>
      <Tooltip title={userBalance / 1000000 + " Tz"}>
        <Button disableRipple>{userAddress}</Button>
      </Tooltip>
      <Button sx={{ p: 1 }}>
        <Logout onClick={disconnectWallet} />
      </Button>
    </ButtonGroup>
  );
};

export default DisconnectButton;
