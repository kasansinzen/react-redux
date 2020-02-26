import * as React from "react";
import { connect } from "react-redux";
import { getSummarySchoolApi } from "../services/resource";
import BannerHeader from "../components/BannerHeader";
import NumberFormat from 'react-number-format';
import { baseUrl } from '../services/function';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      summarySchoolResult: []
    };
  }
  componentDidMount() {
    this.getSummarySchools();
  }

  getSummarySchools(requests = {}) {
    getSummarySchoolApi().then(result => {
      const data = result['data']['data'];
      this.setState({ summarySchoolResult: data['report_group'] });
    });
  }

  render() {
    return (<div className="Dashbord">
      <BannerHeader title="Summary School" />
      <div className="row">
        <div className="col-12">
          <div className="table-responsive rounded-top" id="table-scroll">
            <table className="table table_reportcard table-striped table-light text-center table-hover border-gray rounded-top">
              <thead className="thead-ictteam rounded-top">
                <tr className="bg_table_blue rounded-top">
                  <th className="border" rowSpan="2">ลำดับ</th>
                  <th className="border" rowSpan="2">กลุ่มโรงเรียน</th>
                  <th className="border" rowSpan="2">จำนวนโรงเรียนทั้งหมด</th>
                  <th className="border" rowSpan="2">แผนพัฒนา</th>
                  <th className="border" rowSpan="2">ติดตั้งอุปกรณ์ ICT ทุกห้องเรียน</th>
                  <th className="border" rowSpan="2">ติดตั้ง True Fiber</th>
                  <th className="border" colSpan="2">จัดจ้าง ICT Talent</th>
                  <th className="border" rowSpan="2">ติดตั้ง Learning Center</th>
                  <th className="border" rowSpan="2">NB for Education</th>
                </tr>
                <tr className="bg_table_blue rounded-top">
                  <th className="border">Active</th>
                  <th className="border">In-Active</th>
                </tr>
              </thead>
              <TbodySummarySchoolList results={this.state.summarySchoolResult} />
            </table>
          </div>
        </div>
      </div>
    </div>);
  }
}

const TbodySummarySchoolList = (props) => {
  const summarySchoolAll = props.results.map(group => group.group_type.find(type => type.param == "SchoolAll").cnt).reduce((previous, current) => parseInt(previous) + parseInt(current), 0);
  const summarySchoolPlan = props.results.map(group => group.group_type.find(type => type.param == "SchoolPlan").cnt).reduce((previous, current) => parseInt(previous) + parseInt(current), 0);
  const summaryICTMedia = props.results.map(group => group.group_type.find(type => type.param == "ICTMedia").cnt).reduce((previous, current) => parseInt(previous) + parseInt(current), 0);
  const summaryFiber = props.results.map(group => group.group_type.find(type => type.param == "Fiber").cnt).reduce((previous, current) => parseInt(previous) + parseInt(current), 0);
  const summaryICTTalentAct = props.results.map(group => group.group_type.find(type => type.param == "ICTTalentAct").cnt).reduce((previous, current) => parseInt(previous) + parseInt(current), 0);
  const summaryICTTalentInAct = props.results.map(group => group.group_type.find(type => type.param == "ICTTalentInAct").cnt).reduce((previous, current) => parseInt(previous) + parseInt(current), 0);
  const summaryLearningCenter = props.results.map(group => group.group_type.find(type => type.param == "LearningCenter").cnt).reduce((previous, current) => parseInt(previous) + parseInt(current), 0);
  const summaryNotebook = props.results.map(group => group.group_type.find(type => type.param == "Notebook").cnt).reduce((previous, current) => parseInt(previous) + parseInt(current), 0);
  return (
    <tbody id="tableBody">
      {props.results.map((result, key) => (<tr key={key}>
        <td className="">{key + 1}</td>
        <td className="text-left">
          <a href={baseUrl(`school/lists?grouptrue=${result.group_id}`)} target="_blank" rel="noopener noreferrer">{result.group_name}</a>
        </td>
        {result.group_type.map((type, key) => (<td key={key}>
          <a href={baseUrl(`school/lists?grouptrue=${result.group_id}&grouptruetype=${type.param}`)} target="_blank" rel="noopener noreferrer">
            <NumberFormat value={type.cnt} displayType={'text'} thousandSeparator={true} />
          </a>
        </td>))}
      </tr>))}
      <tr className="border-top-2">
        <td colSpan="2" className="font-weight-bold">รวมทั้งหมด</td>
        <td><NumberFormat value={summarySchoolAll} displayType={'text'} thousandSeparator={true} /></td>
        <td><NumberFormat value={summarySchoolPlan} displayType={'text'} thousandSeparator={true} /></td>
        <td><NumberFormat value={summaryICTMedia} displayType={'text'} thousandSeparator={true} /></td>
        <td><NumberFormat value={summaryFiber} displayType={'text'} thousandSeparator={true} /></td>
        <td><NumberFormat value={summaryICTTalentAct} displayType={'text'} thousandSeparator={true} /></td>
        <td><NumberFormat value={summaryICTTalentInAct} displayType={'text'} thousandSeparator={true} /></td>
        <td><NumberFormat value={summaryLearningCenter} displayType={'text'} thousandSeparator={true} /></td>
        <td><NumberFormat value={summaryNotebook} displayType={'text'} thousandSeparator={true} /></td>
      </tr>
    </tbody>
  );
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);