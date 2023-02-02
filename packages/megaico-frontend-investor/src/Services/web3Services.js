import { toast } from 'react-toastify';
import Web3 from 'web3';
import { web3Config } from './web3config/web3config';
import { saveTransaction, AirDropRegistered } from '../Redux/actions/actions';
import {
  AIR_DROP_DATA,
  TOKEN_DATA,
  WALLET_CONNECTED,
} from '../Redux/actions/types';
import abiMain from './web3config/abiMain.json';
import abiAdmin from './web3config/abiAdmin.json';
import abiAirdrop from './web3config/abiAirdrop.json';
import { setName } from '../components/TokenInfo';
const { AdminAddress, infuraLink, MainAddress, AirDropAddress } = web3Config;
//Connecting Wallet
export const WalletConnect = () => (dispatch) => {
  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      let web3 = new Web3(window.ethereum);
      //   await window.ethereum.send("eth_requestAccounts");
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      dispatch({
        type: WALLET_CONNECTED,
        payload: 'Connected',
      });
      setTimeout(() => {
        toast.success('Wallet Connected');
      }, 1500);
    } else {
      toast.warning('Install Metamask');
    }
  };
  connect();
};

//Disconnecting Local Logic
export const disconnectWallet = (setLoading) => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: WALLET_CONNECTED,
      payload: 'Disconnected',
    });
    setLoading(false);
    toast.info('Wallet Disconnected');
  }, 1000);
};
//getting info about airdrop
export const AirDropData = () => (dispatch) => {
  const data = async () => {
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraLink));
    const contract = new web3.eth.Contract(abiAirdrop, AirDropAddress);
    const isOpen = await contract.methods.isOpen().call();
    const airdropClosingTime = await contract.methods
      .airdropClosingTime()
      .call();

    const airDrop = {
      ClosingTime: airdropClosingTime,
      open: isOpen,
    };
    console.log(airDrop);
    dispatch({
      type: AIR_DROP_DATA,
      payload: airDrop,
    });
  };
  data();
};
//applying for airdrop
export const applyForAirdrop = (wallet_address) => (dispatch) => {
  const data = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        let web3 = new Web3(window.ethereum);
        let address = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(abiAirdrop, AirDropAddress);
        const registration = await contract.methods
          .registration(wallet_address)
          .send({
            from: address[0],
          });
        console.log(registration);
        dispatch(AirDropRegistered());
      } else {
        toast.warning('Install Metamask');
      }
    } catch (err) {
      console.log(err);
    }
  };
  data();
};

//Buying Tokens
export const buyToken = (e, setLoading, referralAddress, id) => (dispatch) => {
  setLoading(true);
  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(abiMain, MainAddress);
  const buy = async () => {
    if (await window.ethereum.selectedAddress) {
      try {
        const adress = await web3.eth.getAccounts();
        // //BUYING
        const time = new Date();
        const referralBonusWei = await contract.methods
          .referalCommision()
          .call();
        const referralBonus = web3.utils.fromWei(referralBonusWei);
        const buy = await contract.methods
          .buyTokens(adress[0], referralAddress)
          .send({
            from: adress[0],
            value: web3.utils.toWei(`${e}`),
          });
        if (buy.status === true) {
          const eth =
            web3.utils.fromWei(
              buy.events.TokensPurchased?.returnValues?.value
            ) + '';
          const tokens =
            web3.utils.fromWei(
              buy.events.TokensPurchased?.returnValues?.amount
            ) + '';
          dispatch(
            saveTransaction(
              id,
              referralAddress,
              referralBonus,
              buy,
              eth,
              tokens,
              time
            )
          );
          dispatch(tokenData(localStorage.getItem('contractAddress')));
          toast.success('Purchase Success');
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        toast.error('TRANSACTION FAILED');
      }
    } else {
      toast.error('connect wallet first');
      setLoading(false);
    }
  };
  buy();
};

//getting token Data
export const tokenData = () => (dispatch) => {
  const data = async () => {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(infuraLink));
      const contract = new web3.eth.Contract(abiMain, MainAddress);
      const contract1 = new web3.eth.Contract(abiAdmin, AdminAddress);
      const totalSupplyWei = await contract1.methods.totalSupply().call();

      const preIcoClosingTime = await contract.methods
        .PreIcoClosingTime()
        .call();

      const preIcoOpeningTime = await contract.methods
        .preIcoOpeningTime()
        .call();

      const postIcoClosingTime = await contract.methods.closingTime().call();

      const postIcoOpeningTime = await contract.methods.openingTime().call();

      const preIcoHasClosed = await contract.methods.preIcoHasClosed().call();

      const hardCapWei = await contract.methods.cap().call();
      const softCapWei = await contract.methods.goal().call();

      const tokenRaisedWei = await contract.methods.weiRaised().call();

      const investorMinCapWei = await contract.methods.investorMinCap().call();

      const investorHardCapWei = await contract.methods
        .investorHardCap()
        .call();

      const icoClosed = await contract.methods.hasClosed().call();

      //from wei
      const totalSupply = web3.utils.fromWei(totalSupplyWei);
      const investorHardCap = web3.utils.fromWei(investorHardCapWei);
      const investorMinCap = web3.utils.fromWei(investorMinCapWei);
      const hardCap = web3.utils.fromWei(hardCapWei);
      const softCap = web3.utils.fromWei(softCapWei);
      const tokenRaised = web3.utils.fromWei(tokenRaisedWei);

      const tokenData = {
        totalSupply: totalSupply,
        preIcoOpeningTime: preIcoOpeningTime,
        preIcoClosingTime: preIcoClosingTime,
        preIcoHasClosed: preIcoHasClosed,
        postIcoOpeningTime: postIcoOpeningTime,
        postIcoClosingTime: postIcoClosingTime,
        icoClosed: icoClosed,

        investorHardCap: investorHardCap,
        investorMinCap: investorMinCap,
        hardCap: hardCap,
        softCap: softCap,
        tokenRaised: tokenRaised,
      };
      dispatch({
        type: TOKEN_DATA,
        payload: tokenData,
      });
    } catch (error) {}
  };
  data();
};
