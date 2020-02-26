import * as React from "react";
import { connect } from "react-redux";
import { baseUrl } from "../services/function";
import { prefixNameList, classRoomList, roomList } from "../services/school-service";
import { getProvinceApi, getSchoolApi } from "../services/resource";
import AsyncSelect  from 'react-select/async';
import styled from 'styled-components'

const ValidatorAlert = (props) => {
  const {textAlert, isShow} = props;
  if(!isShow) return false;
  return (
    <div className="txt_red">{textAlert}</div>
  )
}
const baseDataObjectFormRegister = (requests = {}) => ({...requests, id: "", value: "", status: false, alert: ""});

// Component
import DisplayInfo from "../components/DisplayInfo";

class RegisterUpskill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Result State
      provinceResult: [],
      schoolResult: [],
      schoolOptionResult: [],

      // Input State
      citizenIdInput: baseDataObjectFormRegister(),
      phoneInput: baseDataObjectFormRegister(),
      prefixNameInput: baseDataObjectFormRegister(),
      nameInput: baseDataObjectFormRegister(),
      surnameInput: baseDataObjectFormRegister(),
      provinceInput: baseDataObjectFormRegister(),
      schoolInput: baseDataObjectFormRegister(),
      classRoomInput: baseDataObjectFormRegister(),
      roomInput: baseDataObjectFormRegister()
    };

    this.handleBlurFormRegister = this.handleBlurFormRegister.bind(this);
    this.handleSubmitRegisterUpskill = this.handleSubmitRegisterUpskill.bind(this);
    this.handleChangeProvince = this.handleChangeProvince.bind(this);
    this.handleLoadOptionSchool = this.handleLoadOptionSchool.bind(this);
  }

  componentDidMount() {
    this.getProvinces();
    console.log("{this.state.prefixNameInput.value}", this.state.prefixNameInput)
  }

  getProvinces() {
    getProvinceApi().then(result => {
      let data = result['data']['data'] ? result['data']['data'] : [];
      if(data.length > 0){
        console.log("data", data)
        this.setState({ provinceResult: data.map(province => ({...province, province_name: province.province_name.trim()})) });
        // console.log(this.state.provinceResult)
      }
      // console.log(this.state.provinceResult);
    })
  }
  getSchools(requests = {}) {
    getSchoolApi(requests).then(result => {
      let data = result['data']['data'] ? result['data']['data'] : [];
      this.setState({
        schoolResult: data,
        schoolOptionResult: data.map(school => ({label: school.school_name, value: school.school_id}))
      });
    })
  }

  handleBlurFormRegister(event) {
    const target = event.target;
    const targetLabel = $(target).parent().find('label').text().replace(" *", "");
    const prefixAlert = target.tagName == "INPUT" ? "กรุณากรอก" : "กรุณาเลือก";
    const stateInputID = target.id.replace("-input", "Input");
    console.log("stateInputID", stateInputID)
    console.log("this.state.prefixNameInput", this.state.prefixNameInput)
  }
  handleSubmitRegisterUpskill(event) {

  }
  handleChangeProvince(event) {
    const provinceID = event.target.value;
    if(!provinceID){
      this.setState(state => {({
        provinceInput: {...state.provinceInput, id: "", value: ""}
      })});  
      return false;
    }
    const provinceFilter = this.state.provinceResult.find(province => province.province_id == provinceID);
    if(provinceFilter == undefined) return false;
    this.setState(state => {({
      provinceInput: {...state.provinceInput, id: provinceID, value: provinceFilter.province_name}
    })});
    let requests = {province: provinceFilter.province_name};
    this.getSchools(requests);
  }
  handleLoadOptionSchool(inputValue, callback) {
    let requests = {province: this.state.provinceInput.value, school_name: inputValue};
    getSchoolApi(requests).then(result => {
      let data = result['data']['data'];
      this.setState({schoolOptionResult: data.map(school => ({label: school.school_name, value: school.school_id}))});
      callback(this.state.schoolOptionResult);
    })
  };

  render() {
    const StyledAsyncSlect = styled(AsyncSelect)`
      .css-1fhf3k1-control{
        height: 3rem;
      }
      .css-1fhf3k1-control{
        background-color: #ffffff;
        opacity: 1;

        .css-1wa3eu0-placeholder{
          color: #ccc;
        }
      }
    `;
    return (
      <div className="RegisterUpskill">
        <form onSubmit={this.handleSubmitRegisterUpskill}>
          <div className="bg-container04 pt-4">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                  <div className="row">
                    <DisplayInfo />

                    <div className="col-12 col-md-6 col-lg-4 pb_me-3">
                      <div className="form-group">
                        <label className="txt_orange">คำนำหน้า *</label>
                        <select 
                          className="form-control form_card"
                          id="prefixname-input"
                          onChange={(e) => this.setState(state => ({ prefixNameInput: {...state.prefixNameInput, value: e.target} }))}
                          onBlur={this.handleBlurFormRegister}
                        required>
                          <option value="">เลือกคำนำหน้า</option>
                          {prefixNameList().map((prefixName, key) => (<option key={key} value={prefixName.prefix_th}>{prefixName.prefix_th}</option>))}
                        </select>                       
                        <ValidatorAlert textAlert="" isShow={false} />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 col-lg-4 pb_me-3">
                      <div className="form-group">
                        <label className="txt_orange">ชื่อ *</label>
                        <input
                          type="text"
                          className="form-control form_card"
                          placeholder=""
                          id="name-input"
                          onChange={(event) => this.setState(state => ({ nameInput: {...state.nameInput, value: event.target.value} }))}
                          onBlur={this.handleBlurFormRegister}
                          required />
                        {/* <div ng-if="validate_res.name_input" className="txt_red">{{ validate_res.name_input.message }}</div> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4 pb_me-3">
                      <div className="form-group">
                        <label className="txt_orange">นามสกุล *</label>
                        <input
                          type="text"
                          className="form-control form_card"
                          placeholder=""
                          id="surname-input"
                          onChange={(event) => this.setState(state => ({ surnameInput: {...state.surnameInput, value: event.target.value} }))}
                          onBlur={this.handleBlurFormRegister}
                        required />
                        {/* <div ng-if="validate_res.lastname_input" className="txt_red">{{ validate_res.lastname_input.message }}</div> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-6 pb_me-3">
                      <div className="form-group">
                        <label className="txt_orange">เลขบัตรประชาชน 13 หลัก *</label>
                        <input
                          type="text"
                          className="form-control form_card"
                          placeholder=""
                          id="citizenId-input"
                          onChange={(event) => this.setState(state => ({ citizenIdInput: {...state.citizenIdInput, value: event.target.value} }))}
                          onBlur={this.handleBlurFormRegister}
                        required />
                        {/* <div ng-if="validate_res.citizenId_input" className="txt_red">{{ validate_res.citizenId_input.message }}</div> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-6 pb_me-3">
                      <div className="form-group">
                        <label className="txt_orange">หมายเลขโทรศัพท์มือถือ *</label>
                        <input
                          type="text"
                          className="form-control form_card"
                          placeholder=""
                          id="phone-input"
                          onChange={(event) => this.setState(state => ({ phoneInput: {...state.phoneInput, value: event.target.value} }))}
                          onBlur={this.handleBlurFormRegister}
                        required />
                        {/* <div ng-if="validate_res.phone_input" className="txt_red">{{ validate_res.phone_input.message }}</div> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-6 pb_me-3">
                      <div className="form-group">
                        <label className="txt_orange">จังหวัด *</label>
                        <select
                          className="form-control form_card"
                          id="province-input"
                          onChange={this.handleChangeProvince}
                          onBlur={this.handleBlurFormRegister}
                        required>
                          <option value="">เลือกจังหวัด</option>
                          {this.state.provinceResult.map((province, key) => (<option key={key} value={province.province_id}>{province.province_name}</option>))}
                        </select>
                        {/* <div ng-if="validate_res.province_input" className="txt_red">{{ validate_res.province_input.message }}</div> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-6 pb_me-3">
                      <div className="form-group">
                        <label className="txt_orange">โรงเรียน *</label>
                        <StyledAsyncSlect
                          cacheOptions
                          loadOptions={this.handleLoadOptionSchool}
                          defaultOptions={this.state.schoolOptionResult}
                          onClick={this.handleLoadOptionSchool}
                          onChange={(event) => this.setState(state => ({schoolInput: {...state.schoolInput, value: event.value}}))}
                          isDisabled={!this.state.provinceInput}
                          placeholder="เลือกโรงเรียน"
                          id="school-input"
                        />
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-6 pb_me-3">
                      <div className="form-group">
                        <label className="txt_orange">ระดับชั้น *</label>
                        <select
                          id="classRoom-input"
                          className="form-control form_card"
                          onChange={(event) => this.setState(state => ({ classRoomInput: {...state.classRoomInput, value: event.target.value} }))}
                          onBlur={this.handleBlurFormRegister}
                        required>
                          <option value="">เลือกระดับชั้น</option>
                          {classRoomList().map((classRoom, key) => (<option key={key} value={classRoom.name}>{classRoom.name}</option>))}
                        </select>
                        {/* <div ng-if="validate_res.class_input" className="txt_red">{{ validate_res.class_input.message }}</div> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-6 pb_me-3">
                      <div className="form-group">
                        <label className="txt_orange">ห้อง *</label>
                        <select
                          id="room-input"
                          className="form-control form_card"
                          onChange={(event) => this.setState(state => ({ roomInput: {...state.roomInput, value: event.target.value} }))}
                          onBlur={this.handleBlurFormRegister}
                          disabled={!this.state.classRoomInput}
                        required>
                          <option value="">เลือกห้อง</option>
                          {roomList().map((room, key) => (<option key={key} value={room.name}>{this.state.classRoomInput.value}/{room.name}</option>))}
                        </select>
                        {/* <div ng-if="validate_res.room_input" className="txt_red">{{ validate_res.room_input.message }}</div> */}
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="pb-4"></div>
                      <div className="text-center pb-2 txt_grey">ข้อมูลไม่สามารถแก้ไขได้ กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนบันทึก</div>
                    </div>
                    <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 pb_me-3">
                      <button type="submit" className="btn btn_orange btn-block py-2">Submit</button>
                      <div className="pb-4"></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUpskill);