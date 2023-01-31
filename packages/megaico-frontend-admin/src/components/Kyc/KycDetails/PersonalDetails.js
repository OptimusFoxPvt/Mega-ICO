const PersonalDetails = ({ item }) => {
  return (
    <div className='card content-area'>
      <div className='card-innr'>
        <h6 className='card-sub-title'>Personal Information</h6>{' '}
        <ul className='data-details-list b-data-details-list'>
          <li>
            <div className='data-details-head b-data-details-head'>
              First Name
            </div>
            <div className='data-details-des'>{item.first_name}</div>
          </li>
          {/* <!-- li --> */}
          <li>
            <div className='data-details-head b-data-details-head'>
              Last Name
            </div>
            <div className='data-details-des'>{item.last_name}</div>
          </li>
          {/* <!-- li --> */}
          <li>
            <div className='data-details-head b-data-details-head'>
              Email Address
            </div>
            <div className='data-details-des'>
              {item.email ? item.email : ''}
            </div>
          </li>
          {/* <!-- li --> */}
          <li>
            <div className='data-details-head b-data-details-head'>
              Phone Number
            </div>
            <div className='data-details-des'>
              {item.phone_number ? item.phone_number : ''}
            </div>
          </li>
          {/* <!-- li --> */}
          <li>
            <div className='data-details-head b-data-details-head'>
              Date of Birth
            </div>
            <div className='data-details-des'>{item.dob.substring(0, 10)}</div>
          </li>
          {/* <!-- li --> */}
          <li>
            <div className='data-details-head b-data-details-head'>
              Full Address
            </div>
            <div className='data-details-des'>
              {item.address ? item.address : ''}
            </div>
          </li>
          {/* <!-- li --> */}
          <li>
            <div className='data-details-head b-data-details-head'>
              Country of Residence
            </div>
            <div className='data-details-des'>
              {item.nationality ? item.nationality : ''}
            </div>
          </li>
          {/* <!-- li --> */}
          <li>
            <div className='data-details-head'>Telegram Username</div>
            <div className='data-details-des'>
              <span>
                @{item.telegram_username ? item.telegram_username : ''}{' '}
                <em className='far fa-paper-plane'></em>
              </span>
            </div>
          </li>
          {/* <!-- li --> */}
        </ul>
      </div>
    </div>
  );
};

export default PersonalDetails;
