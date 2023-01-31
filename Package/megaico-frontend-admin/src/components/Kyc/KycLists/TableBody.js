import DropDown from "./DropDown";
const TableBody = ({ KYCList }) => {
  let statusClass =
    "badge-md b-button-hovereffect dt-status-md badge badge-outline badge-";
  console.log(KYCList);
  let list = [
    {
      address: "abc",
      address_2: "abc",
      city: "Lahore",
      created_at: "2022-03-25T05:19:45.146Z",
      dob: "2022-03-22T00:00:00.000Z",
      email: "info(at)softnio.com",
      first_name: "Abu Bin",
      identity: [
        "https://res.cloudinary.com/demo/image/upload/e_blur:400/front_face.jpg",
      ],
      identity_type: "passport",
      kyc_status: "approved",
      last_name: "Ishtiyak",
      nationality: "United KingDom",
      phone_number: "+88001700020203",
      state: "punjab",
      telegram_username: "abc123",
      updated_at: "2022-03-25T05:19:45.146Z",
      user: "623d4fe776a73445dcc6f5a8",
      wallet: "ethereum",
      wallet_address: "0x127BB9A4f74E883A69ff59ee7965F628E77977D9",
      zip_code: 999,
      __v: 0,
      _id: "1",
    },
    {
      address: "abc",
      address_2: "abc",
      city: "Lahore",
      created_at: "2022-03-25T05:19:45.146Z",
      dob: "2022-03-22T00:00:00.000Z",
      email: "info(at)softnio.com",
      first_name: "Abu Bin",
      identity: [
        "https://res.cloudinary.com/demo/image/upload/e_blur:400/front_face.jpg",
      ],
      identity_type: "passport",
      kyc_status: "approved",
      last_name: "Ishtiyak",
      nationality: "United KingDom",
      phone_number: "+88001700020203",
      state: "punjab",
      telegram_username: "abc123",
      updated_at: "2022-03-25T05:19:45.146Z",
      user: "623d4fe776a73445dcc6f5a8",
      wallet: "ethereum",
      wallet_address: "0x127BB9A4f74E883A69ff59ee7965F628E77977D9",
      zip_code: 999,
      __v: 0,
      _id: "2",
    },
    {
      address: "abc",
      address_2: "abc",
      city: "Lahore",
      created_at: "2022-03-25T05:19:45.146Z",
      dob: "2022-03-22T00:00:00.000Z",
      email: "info(at)softnio.com",
      first_name: "Abu Bin",
      identity: [
        "https://res.cloudinary.com/demo/image/upload/e_blur:400/front_face.jpg",
      ],
      identity_type: "passport",
      kyc_status: "approved",
      last_name: "Ishtiyak",
      nationality: "United KingDom",
      phone_number: "+88001700020203",
      state: "punjab",
      telegram_username: "abc123",
      updated_at: "2022-03-25T05:19:45.146Z",
      user: "623d4fe776a73445dcc6f5a8",
      wallet: "ethereum",
      wallet_address: "0x127BB9A4f74E883A69ff59ee7965F628E77977D9",
      zip_code: 999,
      __v: 0,
      _id: "3",
    },
    {
      address: "abc",
      address_2: "abc",
      city: "Lahore",
      created_at: "2022-03-25T05:19:45.146Z",
      dob: "2022-03-22T00:00:00.000Z",
      email: "info(at)softnio.com",
      first_name: "Abu Bin",
      identity: [
        "https://res.cloudinary.com/demo/image/upload/e_blur:400/front_face.jpg",
      ],
      identity_type: "passport",
      kyc_status: "approved",
      last_name: "Ishtiyak",
      nationality: "United KingDom",
      phone_number: "+88001700020203",
      state: "punjab",
      telegram_username: "abc123",
      updated_at: "2022-03-25T05:19:45.146Z",
      user: "623d4fe776a73445dcc6f5a8",
      wallet: "ethereum",
      wallet_address: "0x127BB9A4f74E883A69ff59ee7965F628E77977D9",
      zip_code: 999,
      __v: 0,
      _id: "4",
    },
    {
      address: "abc",
      address_2: "abc",
      city: "Lahore",
      created_at: "2022-03-25T05:19:45.146Z",
      dob: "2022-03-22T00:00:00.000Z",
      email: "info(at)softnio.com",
      first_name: "Abu Bin",
      identity: [
        "https://res.cloudinary.com/demo/image/upload/e_blur:400/front_face.jpg",
      ],
      identity_type: "passport",
      kyc_status: "approved",
      last_name: "Ishtiyak",
      nationality: "United KingDom",
      phone_number: "+88001700020203",
      state: "punjab",
      telegram_username: "abc123",
      updated_at: "2022-03-25T05:19:45.146Z",
      user: "623d4fe776a73445dcc6f5a8",
      wallet: "ethereum",
      wallet_address: "0x127BB9A4f74E883A69ff59ee7965F628E77977D9",
      zip_code: 999,
      __v: 0,
      _id: "5",
    },
    {
      address: "abc",
      address_2: "abc",
      city: "Lahore",
      created_at: "2022-03-25T05:19:45.146Z",
      dob: "2022-03-22T00:00:00.000Z",
      email: "info(at)softnio.com",
      first_name: "Abu Bin",
      identity: [
        "https://res.cloudinary.com/demo/image/upload/e_blur:400/front_face.jpg",
      ],
      identity_type: "passport",
      kyc_status: "approved",
      last_name: "Ishtiyak",
      nationality: "United KingDom",
      phone_number: "+88001700020203",
      state: "punjab",
      telegram_username: "abc123",
      updated_at: "2022-03-25T05:19:45.146Z",
      user: "623d4fe776a73445dcc6f5a8",
      wallet: "ethereum",
      wallet_address: "0x127BB9A4f74E883A69ff59ee7965F628E77977D9",
      zip_code: 999,
      __v: 0,
      _id: "6",
    },
  ];
  return (
    <tbody>
      {list?.map((item) => (
        <tr className="data-item" key={item.user}>
          <td className="data-col dt-user">
            <span className="lead user-name">
              {item.first_name + " " + item.last_name}
            </span>
            <span className="sub user-id">{item._id}</span>
          </td>
          <td className="data-col dt-doc-type">
            <span className="sub sub-s2 sub-dtype">
              {item?.identity_type === "nationalIdCard"
                ? "National ID Card"
                : item?.identity_type === "passport"
                ? "Passport"
                : "Driving Liscense"}
            </span>
          </td>
          {item.identity_type === "nationalIdCard" && (
            <>
              <td className="data-col dt-doc-front">
                <a
                  target="_blank"
                  href={item.identity[0]}
                  className="image-popup"
                >
                  Front Part
                </a>
                &nbsp; &nbsp;
              </td>
              <td className="data-col dt-doc-back">
                <a
                  target="_blank"
                  href={item.identity[1]}
                  className="image-popup"
                >
                  Back Part
                </a>
                &nbsp; &nbsp;
              </td>
            </>
          )}
          {item.identity_type != "nationalIdCard" && (
            <>
              <td className="data-col dt-doc-type">
                <a
                  target="_blank"
                  href={item.identity[0]}
                  className="image-popup"
                >
                  Document
                </a>
                &nbsp; &nbsp;
              </td>
              <td className="data-col dt-doc-front"></td>
            </>
          )}

          <td className="data-col dt-status">
            <span
              className={
                item.kyc_status == "pending"
                  ? statusClass + "info"
                  : item.kyc_status == "approved"
                  ? statusClass + "success"
                  : statusClass + "danger"
              }
            >
              {item.kyc_status}
            </span>
          </td>
          <td className="data-col text-right">
            <DropDown item={item} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
