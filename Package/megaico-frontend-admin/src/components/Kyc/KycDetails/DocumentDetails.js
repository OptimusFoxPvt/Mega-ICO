import passportAFornt from '../../../assets/images/passport-a-fornt.jpg';
import passportABack from '../../../assets/images/passport-a-back.jpg';
const DocumentDetails = ({ item }) => {
  return (
    <div className='card content-area'>
      <div className='card-innr'>
        {' '}
        <h6 class='card-sub-title'>Uploaded Documents</h6>
        <ul className='data-details-list b-data-details-list'>
          {item.identity_type ? (
            <li>
              <div className='data-details-head'>
                {item?.identity_type === 'nationalIdCard'
                  ? 'National ID Card'
                  : item?.identity_type === 'passport'
                  ? 'Passport'
                  : 'Driving Liscense'}
              </div>
              {item?.identity_type === 'nationalIdCard' ? (
                <>
                  {' '}
                  <ul className='data-details-docs'>
                    <li>
                      <span className='data-details-docs-title'>
                        Front Side
                      </span>
                      <div className='data-doc-item data-doc-item-lg'>
                        <div className='data-doc-image'>
                          <img src={item.identity[0]} alt='passport' />
                        </div>
                        <ul className='data-doc-actions'>
                          <li>
                            <a
                              target='_blank'
                              href={item.identity[0]}
                              download='frontside.jpg'
                            >
                              <em className='ti ti-eye'></em>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    {/* <!-- li --> */}
                    <li>
                      <span className='data-details-docs-title'>Back Side</span>
                      <div className='data-doc-item data-doc-item-lg'>
                        <div className='data-doc-image'>
                          <img src={item.identity[1]} alt='passport' />
                        </div>
                        <ul className='data-doc-actions'>
                          <li>
                            <a
                              download='backside.png'
                              target='_blank'
                              href={item.identity[1]}
                            >
                              <em className='ti ti-eye'></em>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    {/* <!-- li --> */}
                  </ul>
                </>
              ) : (
                <ul className='data-details-docs'>
                  <li>
                    <span className='data-details-docs-title'>Document</span>
                    <div className='data-doc-item data-doc-item-lg'>
                      <div className='data-doc-image'>
                        <img src={item.identity[0]} alt='passport' />
                      </div>
                      <ul className='data-doc-actions'>
                        <li>
                          <a
                            target='_blank'
                            href={item.identity[0]}
                            download='document.jpg'
                          >
                            <em className='ti ti-eye'></em>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <ul className='data-details-docs'>
                <li>
                  <span className='data-details-docs-title'>No Document</span>
                  <div className='data-doc-item data-doc-item-lg'>
                    <div className='data-doc-image'>
                      {/* <img src={passportAFornt} alt="passport" /> */}
                    </div>
                    <ul className='data-doc-actions'>
                      <li></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DocumentDetails;
