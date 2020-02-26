import * as React from "react";
import { connect } from "react-redux";
// Service
import { getRegionApi, getProvinceApi, getAreaApi, getPartnerApi } from "../services/resource";
import { geoRegionRename } from "../services/function";

class FormFilterSchool extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      groupOpening: "",
      regionResult: [],
      provinceResult: [],
      areaResult: [],
      partnerResult: [],

      regionInput: "",
      provinceInput: "",
      areaInput: "",
      partnerInput: "",
      qInput: ""
    });

    this.handleChangeFormFilter = this.handleChangeFormFilter.bind(this);
    this.handleSubmitFilterSchool = this.handleSubmitFilterSchool.bind(this);
  }

  componentDidMount() {
    this.getRions();
    this.getProvinces();
    this.getAreas();
    this.getPartners();
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.groupOpening != this.state.groupOpening){
      this.setState({
        groupOpening: nextProps.groupOpening,
        regionInput: "",
        provinceInput: "",
        areaInput: "",
        partnerInput: "",
        qInput: ""
      });
    }
  }

  getRions() {
    getRegionApi().then(result => {
      let data = result['data']['data'];
      this.setState({regionResult: data['KPI'].map(result => geoRegionRename(result))});
    });
  }
  getProvinces(requests = {}) {
    getProvinceApi(requests).then(result => this.setState({provinceResult: result['data']['data']['KPI']}));
  }
  getAreas() {
    getAreaApi().then(result => this.setState({areaResult: result['data']['data']['area']}));
  }
  getPartners() {
    getPartnerApi().then(result => this.setState({partnerResult: result['data']['data']['partner']}));
  }

  handleChangeFormFilter(event) {
    let inputValue = event.target.value;
    let inputName = event.target.name;
    
    switch(inputName) {
      case "region":
        this.setState({ regionInput: inputValue });
        let regionId = inputValue;
        let regionFind = this.state.regionResult.find(result => result.region_id == regionId);
        inputValue = regionFind != undefined ? regionFind.region_name : "";
        
        this.getProvinces({rgid: regionId});
        break;
      case "province":
        this.setState({ provinceInput: inputValue });
        let provinceId = inputValue;
        let provinceFind = this.state.provinceResult.find(result => result.province_id == provinceId);
        inputValue = provinceFind != undefined ? provinceFind.province_name : "";
        break;
      case "area":
        this.setState({ areaInput: inputValue });
        break;
      case "partner":
        this.setState({ partnerInput: inputValue });
        break;
    }
    this.props.increment(inputValue, inputName);
  }

  handleSubmitFilterSchool(event) {
    event.preventDefault();
    this.props.submitFilterSchool(event);
  }

  render() {
    return(<div className="FormFilterSchool">
      <form onSubmit={this.handleSubmitFilterSchool}>
        <div className="row">
          <div className="col-md pb_me-3">
            <select name="region" className="form-control form_card" onChange={this.handleChangeFormFilter} value={this.state.regionInput}>
              <option value="">เลือกภาค</option>
              {this.state.regionResult.map((region, key) => (
                <option key={key} value={region.region_id}>{region.region_name}</option>
              ))}
            </select>
          </div>
          <div className="col-md pb_me-3 position-relative">
            <select name="province" className="form-control form_card" onChange={this.handleChangeFormFilter} value={this.state.provinceInput}>
              <option value="">เลือกจังหวัด</option>
              {this.state.provinceResult.map((province, key) => (
                <option key={key} value={province.province_id}>{province.province_name}</option>
              ))}
            </select>
          </div>
          <div className="col-md pb_me-3">
            <select name="area" className="form-control form_card" onChange={this.handleChangeFormFilter} value={this.state.areaInput}>
              <option value="">สำนักงานเขตพื้นที่</option>
              {this.state.areaResult.map((area, key) => (
                <option key={key} value={area.data}>{area.data}</option>
              ))}
            </select>
          </div>
          <div className="col-md pb_me-3">
            <select name="partner" className="form-control form_card" onChange={this.handleChangeFormFilter} value={this.state.partnerInput}>
              <option value="">เลือกบริษัท</option>
              {this.state.partnerResult.map((partner, key) => (
                <option key={key} value={partner}>{partner}</option>
              ))}
            </select>
          </div>
          <div className="col pb_me-3">
            <div className="input-group form_card">
              <input
                type="text"
                className="form-control"
                placeholder="ค้นหาจากคำ"
                name="q"
                onChange={this.handleChangeFormFilter}
                value={this.props.schoolFilterRequests.schoolSearch}
              />
              <div className="input-group-append">
                <button className="btn btn_blue btn-block rounded-right form_card_front"
                  type="submit"
                  onClick={this.handleClick}
                >Search</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return { schoolFilterRequests: state.schoolFilterRequests };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increment(data, typeRequest) {
      dispatch({ type: typeRequest.toUpperCase(), value: data });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(FormFilterSchool);