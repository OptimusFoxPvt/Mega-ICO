const DetailsHeader = ({ item }) => {
  return (
    <div className='card content-area'>
      <div className='card-innr'>
        {' '}
        <div className='data-details d-md-flex flex-wrap align-items-center justify-content-between b-border-bottom-kycdetail'>
          <div className='fake-class'>
            <span className='data-details-title'>Submitted By</span>
            <span className='data-details-info'>{item?._id}</span>
          </div>
          <div className='fake-class'>
            <span className='data-details-title'>Submitted On</span>
            <span className='data-details-info'>2018-08-24 10:12PM</span>
          </div>
          <div className='fake-class'>
            <span className='data-details-title'>Checked By</span>
            <span className='data-details-info'>Admin</span>
          </div>
          <div className='fake-class'>
            <span className='data-details-title'>Checked On</span>
            <span className='data-details-info'>
              2018-08-24 10:12PM
              <a
                style={{ position: 'relative', left: '90px' }}
                className='b-button-color  b-button-hovereffect'
                href=''
              >
                {item.kyc_status}
              </a>
            </span>
          </div>

          <div className='fake-class'>
            <span className='data-details-title'>Admin Note</span>
            <span className='data-details-info'>Verified by phone call</span>
          </div>
        </div>{' '}
        <div className='gaps-3x'></div>
      </div>
    </div>
  );
};

export default DetailsHeader;
