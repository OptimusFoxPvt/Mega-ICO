import React, { useEffect } from 'react';
import withMainLayout from '../../HOC/withMainLayout';
import { useHistory, useLocation, useParams } from 'react-router';
import { useState } from 'react';
import DetailsHeader from './DetailsHeader';
import PersonalDetails from './PersonalDetails';
import DocumentDetails from './DocumentDetails';
import { useSelector, useDispatch } from 'react-redux';
import { GetKYCLists } from '../../../Redux/actions/actions';
import DropDown from '../KycLists/DropDown';
import browserRoute from '../../../Routes/browserRoutes';
const KycForm = () => {
  const { params } = useParams();
  console.log(params);
  let id = window.location.href.split(`${browserRoute.KYC_DETAILS_BTN}`)[1];

  let history = useHistory();
  const [toggleMenu, setToggleMenu] = useState(false);
  const toogleMenuBtn = (e) => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  };
  const list = useSelector((state) => state.auth.kycList);
  const item1 = list?.data?.filter((a) => a?._id === id)[0];
  const item = {
    address: 'abc',
    address_2: 'abc',
    city: 'Lahore',
    created_at: '2022-03-25T05:19:45.146Z',
    dob: '2022-03-22T00:00:00.000Z',
    email: 'info(at)softnio.com',
    first_name: 'Abu Bin',
    identity: [
      'https://res.cloudinary.com/demo/image/upload/e_blur:400/front_face.jpg',
    ],
    identity_type: 'passport',
    kyc_status: 'approved',
    last_name: 'Ishtiyak',
    nationality: 'United KingDom',
    phone_number: '+88001700020203',
    state: 'punjab',
    telegram_username: 'abc123',
    updated_at: '2022-03-25T05:19:45.146Z',
    user: '623d4fe776a73445dcc6f5a8',
    wallet: 'ethereum',
    wallet_address: '0x127BB9A4f74E883A69ff59ee7965F628E77977D9',
    zip_code: 999,
    __v: 0,
    _id: '1',
  };
  return (
    <>
      <div class='page-content'>
        <div class='container-fluid'>
          <div class='card-head'>
            <h4 class='card-title'>KYC Details</h4>
          </div>

          {item && (
            <>
              <DetailsHeader item={item} />

              <PersonalDetails item={item} />

              <DocumentDetails item={item} />
            </>
          )}
        </div>
        {/* <!-- .card-innr --> */}

        {/* <!-- .container --> */}
      </div>
      {/* <!-- .page-content --></div> */}
    </>
  );
};

export default withMainLayout(KycForm);
