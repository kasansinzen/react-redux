import * as React from 'react';
import { connect } from 'react-redux';
// Services
import { getGroupTrueSummarySchoolApi, groupSchoolMappingApi } from "../services/resource";
// Components
import BannerHeader from "../components/BannerHeader";
import SchoolList from "../components/SchoolList";

class GroupXSchool extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      groupTrueResult: [],
      schoolModalIsOpen: false,
      groupOpening: "",
      isActiveMapped: false
    }

    this.handleClickSchoolModal = this.handleClickSchoolModal.bind(this);
    this.getGroupsTrue = this.getGroupsTrue.bind(this);
  }

  componentDidMount() {
    this.getGroupsTrue();
  }

  getGroupsTrue() {
    getGroupTrueSummarySchoolApi().then(result => {
      let data = result['data']['data'];
      this.setState({groupTrueResult: data});
    })
  }

  handleSubmitGroupSchoolMapped(event, requests) {
    event.preventDefault();
    groupSchoolMappingApi(requests).then(result => {
      
    });
  }
  handleClickSchoolModal(event, group, isActiveMapped) {
    console.log("isActiveMapped", isActiveMapped)
    this.setState({groupOpening: group, isActiveMapped: isActiveMapped});
  }

  render() {
    return (<div className="GroupXSchool">
      <BannerHeader title="Group X School" />
      
      <div className="row">
        <div className="col-12 pb-md-3">
          <div className="card h-100 my-0">
            <div className="card-body p-0">
              <div className="table-responsive rounded-top" id="table-scroll">
                <table className="table table_reportcard table-striped table-light text-center table-hover border-gray rounded-top">
                  <thead className="thead-ictteam rounded-top">
                    <tr className="bg_table_blue rounded-top">
                      <th className="m_width_40p bg-primary">No.</th>
                      <th className="m_width_200p bg-primary">Group Name</th>
                      <th className="m_width_200p bg-primary">Count School</th>
                      <th className="m_width_200p bg-primary">Mangement School</th>
                    </tr>
                  </thead>
                  <tbody id="tableBody">
                    {this.state.groupTrueResult.map((group, key) => (<tr key={key}>
                      <td className="text-center">{key+1}</td>
                      <td className="text-left">{group.group_name}</td>
                      <td className="text-center">
                        {group.school_summary}
                      </td>
                      <td className="text-center">
                        <button type="button"
                          className="btn btn-primary mt-auto"
                          data-toggle="modal"
                          data-target="#schoolListModal"
                          onClick={(e) => this.handleClickSchoolModal(e, group.group_id, false)}
                          style={{width: '70px'}}
                        ><i className="fas fa-user-plus"></i></button>
                
                        <button type="button"
                          className="btn btn-warning mt-auto ml-2"
                          data-toggle="modal"
                          data-target="#schoolListModal"
                          onClick={(e) => this.handleClickSchoolModal(e, group.group_id, true)}
                          style={{width: '70px'}}
                        ><i className="fas fa-user-edit"></i></button>
                      </td>
                    </tr>))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="schoolListModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <SchoolList groupOpening={this.state.groupOpening} getGroupsTrue={this.getGroupsTrue} isActiveMapped={this.state.isActiveMapped} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(GroupXSchool);