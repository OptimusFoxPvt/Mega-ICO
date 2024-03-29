
# Mega-ICO

An ICO (Initial Coin Offering) is a fundraising mechanism in which a new cryptocurrency project sells a certain number of tokens to early adopters in exchange for investment. The funds raised are typically used to develop the project's technology and bring it to market. ICOs have become a popular way for blockchain-based projects to raise capital, as they allow investors to purchase tokens in a new project at an early stage. However, ICOs are largely unregulated, which has led to concerns about fraud and lack of investor protection. As a result, some countries have implemented regulations to govern ICOs, and investors should be cautious when considering investing in an ICO.
## Developed By

- [@OPTIMUSFOX](https://www.github.com/OptimusFoxPvt)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`API_KEY`

`API_URL`

`MetaMask_Private_KEY`

`Etherscan_KEY`





## Deployment Smart Contract

Network
```bash
Goerli
```

Admin Address or Token Address
```bash
0x0000000000000000000000000000000000000000
```
CreateToken or FactoryAddress
```bash
0x0000000000000000000000000000000000000000
```
MainAddress or ICOAddress
```bash
0x0000000000000000000000000000000000000000
```
Airdrop
```bash
0x0000000000000000000000000000000000000000
```
Bounty address
```bash
0x0000000000000000000000000000000000000000
```

Token Name
```bash
TokenWiz
```
Token Symbol
```bash
TWZ
```

## Run Project Locally

### Mega-ICO SmartContract


Go to the project directory

```bash
  cd Mega-ICO
```

Install dependencies

```bash
  npm init
  npm install --save-dev hardhat
  npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Compiling Contract

```bash
  npx hardhat compile
```


Run Local Hardhat Node

```bash
  npx hardhat node
```

Deploy Contract

```bash
  npx hardhat run scripts/deploy.js
```

Run Test Cases

```bash
  npx hardhat test
```

### Mega-ICO Frontend


```bash
  npm install
```
```bash
  npm start
```
```bash
  http://localhost:3000
```

### Mega-ICO Backend

```bash
  npm install
```
```bash
  npm start
```
```bash
  http://localhost:8000
```
## Important Information

Total Supply, Pre sale, Main sale, Bonus in pre-ico
```bash
100
```
Pre sale
```bash
30% tokens
```
Main sale
```bash
70% tokens
```
Bonus in pre-ico
```bash
20%
```

Softcap & Hardcap
```bash
20 eth - dw60 eth
```
Investor Min Cap & Investor max hardcap
```bash
 5 wei/0.000000000000000001 ether -  5 ether
```
Airdrop
```bash
For registration, investor must have 1 token, airdrop distribution : 10% from the total supply, airdrop award: 2 token, In airdrop, admin sends the tokens by their choice if he enters 10, means 10,10 tokes will be distributed to everyone who participates in an Airdrop.

```

Referal Program
```bash
To increase the reach of the ICO program, our platform is incorporated with a referral program. The KYC-approved investor can share the ICO project with others via the referral links available on his panel to gain some reward. The investor gets the referral bonus when the referee signs up on the ICO platform and purchases at least one token in his first transaction and referal commision is 2 tokens. The contract is a combination of several different contracts such as CappedCrowdsale, RefundableCrowdsale, and TimedCrowdsale. The contract also has several functions such as getUserContribution, _updatePurchasingState, _forwardFunds, _finalization, and _preValidatePurchase. The contract enforces rules such as minimum and maximum investment caps, a time limit for the crowdfunding campaign, and a mechanism for refunding funds if the fundraising goal is not met
```
Bounty Distribution
```bash
10% from the Total Supply
```


## Kick Starter

This is a smart contract for a crowdsale of an ERC20 token on the Ethereum blockchain. It includes features such as a reentrancy guard, ownable contract, and safe math for handling uint256 values. It allows for the conversion of wei to the smallest indivisible token unit, and funds are collected in a specified wallet address. The contract also includes functionality for a pre-ICO and ICO stage, bonus tokens for pre-ICO purchases, and allocation of tokens for pre-ICO and ICO stages. It also includes an event for token purchase logging and a fallback function for direct purchases from other contracts.

Contract Functions of KickStater:
```bash
   constructor(
        address payable wallet,
        ERC20 token
    )

  function getUserContribution(address _beneficiary)
  function _updatePurchasingState(address _beneficiary, uint256 _weiAmount)
  function _forwardFunds()
  function _finalization()
  function _preValidatePurchase(address beneficiary, uint256 weiAmount)
```


## AirDrop 
This is an Ownable contract for an airdrop on the Ethereum blockchain. It uses the ERC20 token standard, which defines a common set of functions that a token contract should implement. 
The contract allows the owner to set an opening and closing time for the airdrop, and only allows users to register for the airdrop while it is open. The contract also keeps track of the total number of tokens allocated for the airdrop and the total number of tokens that have been distributed, and it prevents the airdrop from exceeding the allocated amount.
 The contract also includes a function to drop the tokens and it distributes the tokens to the registered recipients. The contract also includes several modifiers, such as 'onlyWhileOpen' and 'onlyOwner' which are used to restrict certain functions to only be callable during certain conditions and by the owner of the contract respectively.

## Bounty 
The contract has an IERC20 token, and a private variable _bountyAllocation and _bountyUsedTokens which store the bounty token distribution and the bounty used tokens respectively. The contract has a constructor that takes an IERC20 token address as an argument and assigns it to the token variable. The contract has two public functions, bountyAllocation() which returns the bounty token distribution, and bountyReward(address recipient, uint256 amount) which allows the owner of the contract to distribute tokens as a reward to a specified recipient address, after checking that the recipient address is not the contract owner or address(0) and also checking that the total amount of tokens distributed as a reward does not exceed the allocated bounty tokens.



## Roadmap

An Initial Coin Offering (ICO) roadmap typically includes the following steps:

-  Concept development: Determine the idea behind the ICO and what problem it aims to solve.

 -   Whitepaper creation: Write a detailed whitepaper outlining the technical aspects of the project, its goals, and the token economics.

 -   Team formation: Assemble a team of developers, advisors, and marketing specialists to bring the project to life.

  -  Legal compliance: Ensure that the ICO is compliant with relevant laws and regulations.

  -  Community building: Build a community of supporters through social media, online forums, and other channels.

  -  Token creation: Develop the token that will be sold during the ICO and integrate it into the platform.

  -  Marketing and promotion: Advertise the ICO and attract investment from potential backers.

- Token sale: Launch the ICO and sell tokens to investors in exchange for cryptocurrency.

 -   Platform development: Develop and launch the platform, using the funds raised during the ICO.

 -   Token listing: List the token on cryptocurrency exchanges to increase liquidity and allow for trading.

## Problem Statement Mega-ICO

Initial Coin Offering (ICO) is a fundraising mechanism in which new projects sell their underlying cryptocurrency tokens in exchange for Bitcoin, Ethereum, or other cryptocurrencies. The main problem with ICOs is the lack of regulation, which has resulted in many fraudulent ICOs that have caused investors to lose their money. Additionally, there is a lack of transparency in the ICO market, making it difficult for investors to assess the credibility and potential of new projects. Furthermore, there is a high degree of market volatility, which can result in significant losses for investors. These issues have resulted in a loss of trust in the ICO market, making it difficult for legitimate projects to raise funds through this mechanism.

## Solution Statement Mega-ICO

An Initial Coin Offering (ICO) is a fundraising method in which a company issues digital tokens, called coins or tokens, to investors in exchange for fiat currency or cryptocurrency. The solution statement for an ICO is to provide a new and innovative way for companies to raise capital and for investors to participate in the growth and success of the company by purchasing tokens with the expectation of future profits. This approach has the potential to disrupt traditional fundraising methods and provide greater access to investment opportunities for a wider range of people.


## Tech Stack

**Client:** React js, Redux, TailwindCSS

**Server:** Node js, MongoDb

**Smart Contract:** Solidity



## Team

- **Rosheel Baig**  ( CTO OptimusFox )

   *****Email***** : rosheel@optimusfox.com

## Support

For support, email info@optimusfox.com

## Contact Information

**Email*** : info@optimusfox.com
 
  **Website** : https://www.optimusfox.com/

  **Discord**: https://discord.gg/jYnV2mVz
  
  **Twitter**: https://twitter.com/fox_optimus
## License

[MIT](https://choosealicense.com/licenses/mit/)

