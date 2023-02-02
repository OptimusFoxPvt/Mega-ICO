export const dashboard = {
  breadCrumb: 'Dashboard',
  tokenBalance: {
    title: 'Token Balance',
    data: '100',
  },
  participantBounty: {
    title: 'Participant Bounty',
    data: '50',
  },
  referred: {
    title: 'Referred',
    data: '5000',
    percentage: '50',
  },
  icoBonuses: {
    title: 'Active ICO Bonuses',
    tHeadCol1: 'Tire',
    tHeadCol2: 'Bonus',
    tHeadCol3: 'Tenure',
    tHeadCol4: 'Ends In',
  },
  calculator: {
    headerTitle: 'Exchange rates calculator',
    eth: 'ETH',
    btc: 'BTC',
    usd: 'USD',
    dem: 'DEM',
    demInfo: "You'll Receive",
  },
  walletDetail: {
    headerTitle: 'Wallet Detail',
    buttonCopy: 'Copy',
    tooltipCopied: 'Copied',
    tooltipCopyAddress: 'Copy Address',
    bodyText: 'Lorem Epsum Lorem Epsum Lorem Epsum',
  },
};

export const usersDetail = {
  breadCrumb: 'Users Detail',
  tableTitle: 'Detail of all Users',
  tooltip: {
    explore: 'Explore User',
    block: 'Block User',
    unBlock: 'Unblock User',
  },
  blockConfirmation: {
    unBlock: 'Unblock',
    block: 'Block',
    bodyText: 'Are you sure, You wanna',
    buttonCancel: 'Not Now!',
    buttonSure: 'Yes Sure!',
  },
  userItem: {
    perosnalDetail: {
      headerTitle: 'Personal Detail',
      blockButton: 'Block User',
    },
    walletDetail: {
      headerTitle: 'Wallet Detail',
    },
    transactionDetail: {
      headerTitle: 'Transaction Detail',
      buttonSeeMore: 'see more',
      eth: 'ETH',
      to: 'To',
    },
    referralDetail: {
      headerTitle: 'Referral Detail',
      buttonCopy: 'Copy',
      referUsers: 'Referred User',
      rewards: 'Rewards',
      tokens: 'Tokens',
      tooltipCopied: 'Copied!',
      tooltipCopyAddress: 'Copy Address',
    },
  },
};

export const participants = {
  breadCrumb: 'Participants',
  tableTitle: 'Participants',
  tooltipUnblock: 'Unblock User',
  tooltipBlock: 'Block User',
  tooltipExplore: 'Explore User',
  tooltipExport: 'Export Data',
  exportModal: {
    headerTitle: 'Exporting Data?',
    bodyText: 'Do you really wanna export Data into CSV File',
    buttonCancel: 'Not Now!',
    buttonSure: 'Yes, Sure!',
  },
  blockConfirmation: {
    unBlock: 'Unblock?',
    block: 'Block?',
    bodyText: 'Are you sure, You wanna',
    buttonCancel: 'Not Now!',
    buttonSure: 'Yes Sure!',
  },
};

export const bonus = {
  breadCrumb: 'Bonus & Referrals',
  referral: {
    headerTitle: 'Referral',
    headerButton: 'Change Reward',
    referralRewards: 'Referral Rewards',
    rewardPercent: 'Reward Percentage',
    referralSignup: 'Referral Sign-Ups',
    rewardedTokens: 'Rewarded Tokens',
    changeRewardModal: {
      title: 'Change Reward',
      referralRewards: 'Referral Rewards',
      rewardPercent: 'Reward Percentage',
      referralSignup: 'Referral Sign-Ups',
      rewardedTokens: 'Rewarded Tokens',
      updateButton: 'Update Reward',
      enter: 'Enter',
    },
  },
  bonusDetail: {
    headerTitle: 'Bonus Details',
    bonusesRunning: 'Bonuses Running',
    rewardedTokens: 'Rewarded Tokens',
  },
  bonusTable: {
    title: 'Active Bonuses',
    tooltipActivate: 'Activate Bonus',
    tooltipDeactivate: 'Deactivate Bonus',
  },
};

export const bountyProgram = {
  breadCrumb: 'Bounty Program',
  tableTitle: 'Bounty Compaign',
  tooltipActivate: 'Activate Compaign',
  tooltipDeactivate: 'Deactivate Compaign',
};

export const airDrop = {
  breadCrumb: 'Air Drop',
  tabAirDrop: {
    tabTitle: 'Air Drop',
    bodyTitle: 'AirDrop Time',
    from: 'From',
    to: 'To',
    totalTokens: 'Total Tokens',
    maxTokens: 'Max Tokens per User',
    tokensEth: 'Tokens per ETH',
    enter: 'Enter',
    updateButton: 'Update Setting',
  },
  tabParticipants: {
    tabTitle: 'Participants',
    tableTitle: 'Participants',
  },
};

export const profile = {
  breadCrumb: 'Profile',
  profileDetail: {
    headerTitle: 'Profile Details',
    changeRewardBtn: 'Change Reward',
    changePasswordBtn: 'Change Password',
  },
  factorAuth: {
    headerTitle: '2 Factor Authentication',
    infoText:
      'Before Turning on 2FA, write down the 16 digit key and put keep it in a safe place. If your phone gets lost,stolen,or erased, you will need this key to get back into your account',
    barcodeText:
      'In order to use 2FA, scan the QR Code to the right into the google authenticator app on your phone, or enter the 16-digit key that appears under the QR Code',
    keyTitle: '16-digit key',
    password: 'Password',
    code: 'Code',
    backupText: 'I have backed up my 16 digit key',
    enableButton: 'Enable 2FA',
  },
};

export const settings = {
  breadCrumb: 'Settings',
  breadCrumb2: 'System Config',
  headerTitle: 'System Config',
  kycConfig: {
    title: 'KYC Config',
    kycTitle1: 'Is KYC Mandatory',
    kycSubtitle1: 'Select to enable or disable KYC mandatory',
    kycTitle2: 'Manual / Automatic',
    kycSubtitle2: 'Select a KYC submission method',
    yes: 'Yes',
    no: 'No',
    manual: 'Manual',
    automatic: 'Automatic',
  },
  icoConfig: {
    title: 'ICO Config',
    icoTitle1: 'Enable Purchase',
    icoSubtitle1: 'Select to enable or disable token purchase',
    icoTitle2: 'Enable Token Claiming',
    icoSubtitle2: 'Select to enable or disable token claiming',
    icoTitle3: 'White Listing',
    icoSubtitle3: 'Select to enable or disable whitelisting',
    yes: 'Yes',
    no: 'No',
  },
};

export const wallets = {
  breadCrumb: 'Wallets',
  tabBtcTitle: 'BTC',

  tabEthereumTitle: 'Ethereum',

  tableBtcTitle: 'BTC Wallets',
  tableEthereumTitle: 'Ethereum Wallets',
  tooltipUploadCsv: 'Upload CSV',
  dialogTitle: 'Upload CSV File',
};

export const kyc = {
  breadCrumb: 'KYC',
  tableTitle: 'KYC Users Detail',
  tooltipExplore: 'Explore User',
  tooltipBlock: 'Block User',
  tooltipUnblock: 'Unblock User',
  blockConfirmation: {
    unBlock: 'Unblock?',
    block: 'Block?',
    bodyText: 'Are you sure, You wanna',
    buttonCancel: 'Not Now!',
    buttonSure: 'Yes Sure!',
  },
  specificUser: {
    headerTitle: 'Specific User',
    acceptButton: 'Accept',
    rejectButton: 'Reject',
    profileImage: 'Profile Image',
    cnicImage: 'CNIC Image',
  },
};
