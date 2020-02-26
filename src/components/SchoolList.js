import * as React from 'react';
import { connect } from 'react-redux';
// Services
import { getSchoolApi, getfilterGroupSchoolApi, groupSchoolMappingApi } from '../services/resource';
import NumberFormat from 'react-number-format';
// Components
import BannerHeader from './BannerHeader';
import PaginationSchool from './PaginationSchool';
import FormFilterSchool from './FormFilterSchool'
import LoadingTable from './LoadingTable';
import { swalToastAlert } from "../services/swal-service";

const perpage = 20;

class SchoolList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupOpening: "",
      isActiveMapped: false,

      isLoading: false,
      btnDisabled: false,
      schoolResult: [],
      schoolInfo: {all_school: 0, all_count: 0},
      schoolSelectedResult: [],
      currentPage: 1,

      isLoadingMapped: false,
      btnDisabledMapped: false,
      schoolMappedResult: [],
      schoolMappedInfo: {all_school: 0, all_count: 0},
      schoolMappedSelectedResult: [],
      currentPageMapped: 1
    }

    this.handleSubmitFilterSchool = this.handleSubmitFilterSchool.bind(this);
    this.handleClickSchoolPageChage = this.handleClickSchoolPageChage.bind(this);
    this.handleClickSchoolMappedPageChage = this.handleClickSchoolMappedPageChage.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    console.log("nextProps", nextProps)
    if(nextProps.groupOpening != this.state.groupOpening){
      this.props.decrement();
      this.setState({
        groupOpening: nextProps.groupOpening,
        currentPage: 1,
        currentPageMapped: 1
      });

      this.getSchools({});
      this.getSchoolsMapped({grouptrue: nextProps.groupOpening});
    }
    if(nextProps.isActiveMapped != this.state.isActiveMapped){
      this.setState({ isActiveMapped: nextProps.isActiveMapped });
    }
  }

  async getSchools(requests, isLoading = true) {
    this.setState({ isLoading: isLoading });
    requests = {...requests, perPage: perpage}
    let result = await getSchoolApi(requests)
    let data = result['data']['data'];
    let schoolSelectedItem = await Promise.all(
      data['school'].map(async (school, key) => {
        let schoolCode = school['school_code'];
        let result = await getfilterGroupSchoolApi({schoolcode: schoolCode, groupid: this.state.groupOpening})
        let data = result['data']['data'];
        return {school_code: schoolCode, status: data.length > 0};
      })
    );
    this.setState({
      schoolResult: data['school'],
      schoolInfo: data['detail'],
      schoolSelectedResult: schoolSelectedItem,
      isLoading: false,
      btnDisabled: false
    });
  }

  async getSchoolsMapped(requests, isLoading = true) {
    this.setState({ isLoadingMapped: isLoading });
    requests = {...requests, perPage: perpage}
    let result = await getSchoolApi(requests)
    let data = result['data']['data'];
    let schoolSelectedItem = await Promise.all(
      data['school'].map(async (school, key) => {
        let schoolCode = school['school_code'];
        let result = await getfilterGroupSchoolApi({schoolcode: schoolCode, groupid: this.state.groupOpening})
        let data = result['data']['data'];
        return {school_code: schoolCode, status: data.length > 0};
      })
    );
    this.setState({
      schoolMappedResult: data['school'],
      schoolMappedInfo: data['detail'],
      schoolMappedSelectedResult: schoolSelectedItem,
      isLoadingMapped: false,
      btnDisabledMapped: false
    });
  }

  handleSubmitFilterSchool(event) {
    event.preventDefault();
    this.getSchools({...this.props.schoolFilterRequests, page: this.currentPage});
    this.getSchoolsMapped({...this.props.schoolFilterRequests, page: this.currentPageMapped, grouptrue: this.state.groupOpening});
  }
  handleClickSchoolPageChage(event, page) {
    this.setState({ currentPage: page });
    this.getSchools({...this.props.schoolFilterRequests, page});
  }
  handleClickSchoolMappedPageChage(event, page) {
    this.setState({ currentPageMapped: page });
    this.getSchoolsMapped({...this.props.schoolFilterRequests, page: page, grouptrue: this.state.groupOpening});
  }
  async handleSelectGroupSchoolMapping(event, schoolCode, statusSubmit, isMapped = false) {
    this.setState({btnDisabled: true, btnDisabledMapped: true});
    let requests = {group_id: this.state.groupOpening, school_code: schoolCode, status_submit: statusSubmit};
    let result = await groupSchoolMappingApi(requests);
    let data = result['data'];
    let getSchoolFn = () => {
      this.getSchools({...this.props.schoolFilterRequests, page: this.state.currentPage}, false);
      this.getSchoolsMapped({...this.props.schoolFilterRequests, page: this.state.currentPageMapped, grouptrue: this.state.groupOpening}, false);
      this.props.getGroupsTrue();
    };
    swalToastAlert(data.status, data.alert, getSchoolFn);
  }

  render() {
    const ButtonMap = (props) => {
      let { isSelected, schoolCode, isMapped } = props;
      if(isSelected){
        return (
          <button type="button" 
            className="btn btn-danger" 
            onClick={e => this.handleSelectGroupSchoolMapping(e, schoolCode, 'destroy', isMapped)}
            disabled={this.state.btnDisabled}
          ><i className="fas fa-times">&nbsp;Remove</i></button>
        );
      }else{
        return (
          <button type="button"
            className="btn btn-primary" 
            onClick={e => this.handleSelectGroupSchoolMapping(e, schoolCode, 'add', isMapped)}
            disabled={this.state.btnDisabled}
          ><i className="fas fa-plus">&nbsp;Add</i></button>
        );
      }
    }

    return(<div className="SchoolList">
      <BannerHeader title="School List" />
      <FormFilterSchool submitFilterSchool={this.handleSubmitFilterSchool} groupOpening={this.state.groupOpening} />
      <div className="row">
        <div className="col-12">
          <ul className="nav nav-tabs mb-1" id="myTab" role="tablist">
            <li className="nav-item">
              <a className={`nav-link ${!this.state.isActiveMapped ? 'active' : ''}`} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">
                Select School ( <NumberFormat value={this.state.schoolInfo.all_count} displayType={'text'} thousandSeparator={true} /> )
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${this.state.isActiveMapped ? 'active' : ''}`}  id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">
                School Mapped ( <NumberFormat value={this.state.schoolMappedInfo.all_count} displayType={'text'} thousandSeparator={true} /> )
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className={`tab-pane fade ${!this.state.isActiveMapped ? 'show active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
              <TableSchoolList
                isLoading={this.state.isLoading}
                schoolResult={this.state.schoolResult}
                schoolSelectedResult={this.state.schoolSelectedResult}
                numberStarted={((this.state.currentPage - 1) * perpage)}
                ButtonMap={ButtonMap}
                isMapped={false}
              />
              <PaginationSchool
                perpage={perpage}
                totalItem={this.state.schoolInfo.all_count}
                clickPageChange={this.handleClickSchoolPageChage}
                currentPage={this.state.currentPage}
                isShow={!this.state.isLoading && this.state.schoolInfo.all_count > perpage}
              />
            </div>
            <div className={`tab-pane fade ${this.state.isActiveMapped ? 'show active' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <TableSchoolList
                isLoading={this.state.isLoadingMapped}
                schoolResult={this.state.schoolMappedResult}
                schoolSelectedResult={this.state.schoolMappedSelectedResult}
                numberStarted={((this.state.currentPageMapped - 1) * perpage)}
                ButtonMap={ButtonMap}
                isMapped={true}
              />
              <PaginationSchool
                perpage={perpage}
                totalItem={this.state.schoolMappedInfo.all_count}
                clickPageChange={this.handleClickSchoolMappedPageChage}
                currentPage={this.state.currentPageMapped}
                isShow={!this.state.isLoadingMapped && this.state.schoolMappedInfo.all_count > perpage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}
const TableSchoolList = (props) => {
  let { isLoading, schoolResult, numberStarted, ButtonMap, schoolSelectedResult, isMapped } = props;
  return (
    <div className="table-responsive rounded-top h-100" id="table-scroll">
      <table className="table table_reportcard table-striped table-light text-center table-hover border-gray rounded-top">
        <thead className="thead-ictteam rounded-top">
          <tr className="bg_table_blue rounded-top">
            <th>No.</th>
            <th>School Code</th>
            <th>School Name</th>
            <th>Province</th>
            <th>Area</th>
            <th>Partner</th>
            <th>Choose User</th>
          </tr>
        </thead>
        <TbodySchool
          isLoading={isLoading}
          results={schoolResult}
          schoolSelectedResult={schoolSelectedResult}
          numberStarted={numberStarted}
          ButtonMap={ButtonMap}
          isMapped={isMapped}
        />
        <LoadingTable isLoading={isLoading} tdCount={7} />
      </table>
    </div>
  );
}
const TbodySchool = (props) => {
  let { results, schoolSelectedResult, numberStarted, ButtonMap, isMapped } = props;
  if(!props.isLoading && results.length > 0){
    return (<tbody id="tableBody">
      {results.map((school, key) => {
        let findSchoolSelected = schoolSelectedResult.find(result => result.school_code == school.school_code);
        return (
          <tr key={key}>
            <td className="text-center">{numberStarted + (key + 1)}</td>
            <td className="text-center">{school.school_code}</td>
            <td className="text-center">{school.school_name}</td>
            <td className="text-left">{school.province}</td>
            <td className="text-left">{school.area_name}</td>
            <td className="text-left">{school.company_group}</td>
            <td>
              <ButtonMap 
                isSelected={findSchoolSelected.status}
                schoolCode={school.school_code}
                isMapped={isMapped}
              />
            </td>
          </tr>
        )
      })}
    </tbody>);
  }
  return false;
}

const mapStateToProps = (state) => {
  return { schoolFilterRequests: state.schoolFilterRequests };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    decrement() {
      dispatch({ type: "CLEAR", value: "" });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SchoolList);