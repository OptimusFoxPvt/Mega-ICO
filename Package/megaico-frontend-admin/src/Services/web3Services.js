import Web3 from 'web3';
import { web3Config } from './web3config/web3config';
import abiAdmin from './web3config/abiAdmin.json';
import abiMain from './web3config/abiMain.json';
import abiAirDrop from './web3config/abiAirDrop.json';
import abiBounty from './web3config/abiBounty.json';
import abiCreateToken from './web3config/abiCreateToken.json';
import {
  TOKEN_DATA,
  AIR_DROP,
  SET_CONTRACT_ADDRESS,
} from '../Redux/actions/types';
import { BountyApproval, AirDropStatus } from '../Redux/actions/actions';
import { toast } from 'react-toastify';
import { saveTransaction } from './profileServices';
import { setName } from '../components/TokenInfo';
import { profile } from '../Routes/serverRoutes';
import axios from 'axios';
const {
  AdminAddress,
  MainAddress,
  BountyAddress,
  infuraLink,
  AirDropAddress,
  CreateTokenAddress,
} = web3Config;
//getting info about token
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
      const currentRateInEth = await contract.methods.currentRate().call();
      const stage = await contract.methods.stage().call();
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
        currentRateInEth: currentRateInEth,
        stage: stage,
        investorHardCap: investorHardCap,
        investorMinCap: investorMinCap,
        hardCap: hardCap,
        softCap: softCap,
        tokenRaised: tokenRaised,
      };
      console.log(tokenData);
      dispatch({
        type: TOKEN_DATA,
        payload: tokenData,
      });
    } catch (err) {}
  };
  data();
};
//AirDrop Data
export const AirDropData = () => (dispatch) => {
  const data = async () => {
    try {
      const web3 = new Web3(new Web3.providers.HttpProvider(infuraLink));
      const contract = new web3.eth.Contract(abiAirDrop, AirDropAddress);
      const Open = await contract.methods.isOpen().call();
      const closingTime = await contract.methods.airdropClosingTime().call();
      const openingTime = await contract.methods.airdropOpeningTime().call();
      const RegisteredUsers = await contract.methods.RegisteredUsers().call();
      const airDropData = {
        open: Open,
        openingTime: openingTime,
        closingTime: closingTime,
        RegisteredUsers: RegisteredUsers,
      };
      dispatch({
        type: AIR_DROP,
        payload: airDropData,
      });

      console.log(airDropData);
    } catch (err) {
      console.log('ERROR IN AIRDROP DATA FETCHING');
    }
  };
  data();
};
//Start AirDrop
export const StartAirDrop = (t1, t2, setDisabled) => (dispatch) => {
  const start = async () => {
    let time1 = Date.parse(t1);
    let time2 = Date.parse(t2);
    time1 = Number(time1.toString().substring(0, 10));
    time2 = Number(time2.toString().substring(0, 10));
    try {
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(abiAirDrop, AirDropAddress);
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
        const Address = await window.ethereum.selectedAddress;
        const StartAirDrop = await contract.methods
          .airdropTiming(time1, time2)
          .send({
            from: Address,
          });
        console.log('start', StartAirDrop);
        setDisabled(false);
        dispatch(AirDropData());
      } else {
        setDisabled(false);
        toast.warning('Install Metamask');
      }
    } catch (err) {
      console.log(err);
      setDisabled(false);
    }
  };
  start();
};
//Bounty Tokens and then saving transactions
export const BountySending =
  (user, to, id, action, setLoading) => (dispatch) => {
    const sendBounty = async () => {
      console.log(user, to, id, action);
      const tokens = '50000000000000';
      try {
        if (typeof window.ethereum !== 'undefined') {
          await window.ethereum.enable();

          const web3 = new Web3(window.ethereum);
          const Address = await window.ethereum.selectedAddress;
          const contract = new web3.eth.Contract(abiBounty, BountyAddress);
          const sendBounty = await contract.methods
            .bountyReward(to, tokens)
            .send({
              from: Address,
            });

          console.log(sendBounty);
          let time = new Date();
          toast.success('TRANSACTION SUCCESSFULL');
          dispatch(
            saveTransaction(
              user,
              web3.utils.fromWei(tokens),
              sendBounty,
              time,
              Address
            )
          );
          dispatch(BountyApproval(id, action));
          setLoading(false);
        } else {
          toast.warning('Install Metamask');
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
        toast.error(err?.message);
      }
    };
    sendBounty();
  };
//send airdrop to participants and then saving their transactions
export const AirDropSending = (data, tokens) => (dispatch) => {
  const sendAD = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        let tokensInWei = web3.utils.toWei(tokens);
        console.log(tokens);
        console.log(tokensInWei);
        await window.ethereum.enable();
        const Address = await window.ethereum.selectedAddress;
        const contract = new web3.eth.Contract(abiAirDrop, AirDropAddress);
        const send = await contract.methods.dropTokens(`${tokensInWei}`).send({
          from: Address,
        });
        console.log(send);
        dispatch(AirDropStatus(data, tokens, send, Address));
      } else {
        toast.error('INSTALL METAMASK');
      }
    } catch (err) {
      console.log(err);
    }
  };
  sendAD();
};

//Create Token
export const createToken = (data, setLoading) => (dispatch) => {
  const { tokenName, tokenSymbol, tokenRate, initialTokens } = data;
  const create = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);
        let rate = web3.utils.toWei(tokenRate);
        let initialAmount = web3.utils.toWei(initialTokens);

        await window.ethereum.enable();
        const Address = await window.ethereum.selectedAddress;
        const contract = new web3.eth.Contract(
          abiCreateToken,
          CreateTokenAddress
        );
        const newToken = await contract.methods
          .createToken(tokenName, tokenSymbol, rate, initialAmount)
          .send({ from: Address });
        console.log(newToken);
        const newAddress = newToken.events['0'].address;
        axios
          .post(profile.NEW_TOKEN, {
            contract_address: newAddress,
            abijson: '',
          })
          .then((res) => {
            dispatch({
              type: SET_CONTRACT_ADDRESS,
              payload: newAddress,
            });
          });
        setLoading(false);

        toast.success('TOKEN CREATED AND DEPLOYED');
        localStorage.setItem('isContractDeployed', 'true');
      } else {
        toast.error('INSTALL METAMASK');
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error('ERROR');
    }
  };
  create();
};
