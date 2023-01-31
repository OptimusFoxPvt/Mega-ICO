import React from 'react';
import { tokenSymbol } from '../TokenInfo';

const DetailModal = ({ data }) => {
  return (
    <div class='modal fade' id='requested-details' tabindex='-1'>
      <div class='modal-dialog modal-dialog-md modal-dialog-centered'>
        <div class='modal-content'>
          <div class='popup-body' style={{ textAlign: 'center' }}>
            <h4 class='popup-title'>Requested Details</h4>
            <p class='lead text-primary'>
              <strong>ScreenShot</strong>
            </p>

            <img style={{ width: '300px' }} src={data.screenshot} />
            <div className='mt-4'>
              <a
                className='iconBtn icon'
                href={data.screenshot}
                download='screenshot.png'
              >
                <em
                  style={{ fontSize: 'larger', fontWeight: '600' }}
                  className='ti ti-import'
                ></em>
              </a>
              <a
                className='ml-2 iconBtn icon'
                href={data.screenshot}
                target='_blank'
              >
                <em
                  style={{ fontSize: 'larger', fontWeight: '600' }}
                  className='ti ti-eye'
                ></em>
              </a>
            </div>
            <div class='input-item input-with-label'>
              <label for='token-address' class='mt-5 input-item-label'>
                Link
              </label>
              <a href={data.bountyLink} target='_blank'>
                <p> {data.bountyLink}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
