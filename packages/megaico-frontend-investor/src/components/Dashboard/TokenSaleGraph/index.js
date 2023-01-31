import { useState } from "react";
import Chart from "./Chart";
const SaleGraph = () => {
  const [days, setDays] = useState(7);
  const [activeWeek, setActiveWeek] = useState(true);
  const [activeMonth, setActiveMonth] = useState(false);
  const [activeYear, setActiveYear] = useState(false);
  const [showDropdown, setShowDropdown] = useState({
    profile: false,
    calculator: false,
    language: false,
    time: false,
  });
  return (
    <div className="col-xl-8 col-lg-7">
      <div className="token-sale-graph card card-full-height">
        <div className="card-innr">
          <div className="card-head has-aside">
            <h4 className="card-title">Tokens Sale Graph</h4>
            <div className="card-opt" style={{ display: "flex", gap: "25px" }}>
              <div className="b2-roundbg">
                <a
                  style={{ cursor: "pointer" }}
                  className={`active1 ${activeWeek ? "activeBg" : ""}`}
                  onClick={() => {
                    setShowDropdown({
                      time: !showDropdown.time,
                    });
                    setDays(7);
                    setActiveWeek(!activeWeek);
                    setActiveMonth(false);
                    setActiveYear(false);
                  }}
                >
                  1W
                </a>
              </div>
              <div className="b2-roundbg ">
                <a
                  style={{ cursor: "pointer" }}
                  className={`active1 ${activeMonth ? "activeBg" : ""}`}
                  onClick={() => {
                    setShowDropdown({
                      time: !showDropdown.time,
                    });
                    setDays(30);
                    setActiveMonth(!activeMonth);
                    setActiveWeek(false);
                    setActiveYear(false);
                  }}
                >
                  1M
                </a>
              </div>
              <div className="b2-roundbg ">
                <a
                  style={{ cursor: "pointer" }}
                  className={`active1 ${activeYear ? "activeBg" : ""}`}
                  onClick={() => {
                    setShowDropdown({
                      time: !showDropdown.time,
                    });
                    setDays(12);
                    setActiveYear(!activeYear);
                    setActiveWeek(false);
                    setActiveMonth(false);
                  }}
                >
                  1Y
                </a>
              </div>
            </div>
          </div>

          <div
            className="chart-tokensale"
            style={{
              height: "100%",
            }}
          >
            <Chart d={days} />
          </div>
        </div>
      </div>
    </div>
    // <div className="col-xl-8 col-lg-7">
    //   <div className="token-sale-graph card card-full-height">
    //     <div className="card-innr">
    //       <div className="card-head has-aside">
    //         <h4 className="card-title">Tokens Sale Graph</h4>
    //         <div className="card-opt">
    //           <a
    //             className="link ucap link-light toggle-tigger toggle-caret"
    //             onClick={() =>
    //               setShowDropdown({
    //                 time: !showDropdown.time,
    //               })
    //             }
    //           >
    //             {days === 12 ? "1 Year" : days + " Days"}
    //           </a>
    //           {showDropdown.time && (
    //             <div className="toggle-className dropdown-content">
    //               <ul style={{ cursor: "pointer" }} className="dropdown-list">
    //                 <li>
    //                   <a
    //                     onClick={() => {
    //                       setShowDropdown({
    //                         time: !showDropdown.time,
    //                       });
    //                       setDays(7);
    //                     }}
    //                   >
    //                     7 days
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a
    //                     onClick={() => {
    //                       setShowDropdown({
    //                         time: !showDropdown.time,
    //                       });
    //                       setDays(30);
    //                     }}
    //                   >
    //                     30 days
    //                   </a>
    //                 </li>
    //                 <li>
    //                   <a
    //                     onClick={() => {
    //                       setShowDropdown({
    //                         time: !showDropdown.time,
    //                       });
    //                       setDays(12);
    //                     }}
    //                   >
    //                     1 year
    //                   </a>
    //                 </li>
    //               </ul>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //       <div
    //         style={{
    //           height: "100%",
    //         }}
    //       >
    //         <Chart d={days} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SaleGraph;
