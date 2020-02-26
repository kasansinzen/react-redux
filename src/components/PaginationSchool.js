import * as React from 'react';
import { connect } from "react-redux";
import Pagination from 'react-bootstrap/Pagination';

class PaginationSchool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.currentPage,
      perpage: props.perpage,
      totalItem: props.totalItem,
      maxSize: 5
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.totalItem != this.state.totalItem){
      this.setState({totalItem: nextProps.totalItem});
    }
    if(nextProps.currentPage != this.state.currentPage){
      this.setState({currentPage: nextProps.currentPage});
    }
  }

  render() {
    
    const PaginationItemRender = (props) => {
      let { currentPage, perpage, maxSize, totalItem } = this.state;
      let items = [];
      let itemCount = 0;
      let lastPage = Math.ceil(totalItem / perpage);
      for (let number = 1; number <= (currentPage + 4); number++) {
        if(number <= lastPage && ((currentPage > maxSize && number > maxSize) || (currentPage <= maxSize && number <= maxSize))){
          items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={e => this.props.clickPageChange(e, parseInt(number))}>{number}</Pagination.Item>,
          );
          itemCount++;
        }
      }

      if(itemCount > maxSize) items = items.slice((lastPage - 10))
      return items;
    }

    const PaginationEllipsisRender = (props) => {
      let { currentPage, perpage, maxSize, totalItem } = this.state;
      let items = [];
      if(currentPage <= ((totalItem / perpage ) - 5)){
        items.push(
          <Pagination.Ellipsis key={1} onClick={e => this.props.clickPageChange(e, parseInt(this.state.currentPage + 5))} />
        );
      }
      return items;
    }
    if(this.props.isShow){
      return(
        <div className="PaginationSchool">
          <Pagination className="justify-content-end my-1 mr-1">
            <Pagination.First onClick={e => this.props.clickPageChange(e, 1)} />
            <Pagination.Prev onClick={e => this.props.clickPageChange(e, parseInt(this.state.currentPage - 1))} />
            <PaginationItemRender />
            <PaginationEllipsisRender />
            <Pagination.Next onClick={e => this.props.clickPageChange(e, parseInt(this.state.currentPage + 1))} />
            <Pagination.Last onClick={e => this.props.clickPageChange(e, Math.ceil(this.state.totalItem / this.state.perpage))} />
          </Pagination>
        </div>
      )
    }else{
      return false;
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(PaginationSchool);