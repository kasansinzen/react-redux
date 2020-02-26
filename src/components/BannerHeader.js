import * as React from "react";

const BannerHeader = (props) => {
  let { title } = props;
  return(<div className="BannerHeader">
    <div className="row">
      <div className="col-md-12 pb_me-3">
        <div className="card h-100">
          <div className="card-body pb-0">
            <div className=" text-center">
              <img src="http://connexted.org/ireport/assets/images/main/Logo-CNED.jpg" className="align-middle img-fluid w-100p" alt="" />
            </div>
            <div className="text-center pt-1 txt_splan_namehead" style={{fontSize: '40px'}}>{title}</div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}

export default BannerHeader;