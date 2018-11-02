import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import "./index.scss";

export default class PaginationList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 1,
      groupCount: 5,
      startPage: 1,
      totalPage: 64
    }
  }

  createPage = () => {
    const { groupCount } = this.state;
    const { currentPage, startPage, totalPage } = this.props;
    let pages = []
    pages.push(
      <PaginationItem key={0} disabled={currentPage === 1}>
        <PaginationLink previous onClick={() => this.props.onChangePage(currentPage - 1)} />
      </PaginationItem>
    )

    if (totalPage <= 10) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(
          <PaginationItem key={i} active={currentPage === i}>
            <PaginationLink onClick={() => this.props.onChangePage(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      pages.push(
        <PaginationItem key={1} active={currentPage === 1}>
          <PaginationLink onClick={() => this.props.onChangePage(1)}>
            1
            </PaginationLink>
        </PaginationItem>
      )

      let pageLength = 0;
      if (groupCount + startPage > totalPage) {
        pageLength = totalPage
      } else {
        pageLength = groupCount + startPage;
      }
      if (currentPage >= groupCount) {
        pages.push(<PaginationItem key={-1}><PaginationLink>···</PaginationLink></PaginationItem>)
      }
      for (let i = startPage; i < pageLength; i++) {
        if (i <= totalPage - 1 && i > 1) {
          pages.push(
            <PaginationItem key={i} active={currentPage === i}>
              <PaginationLink onClick={() => this.props.onChangePage(i)}>
                {i}
              </PaginationLink>
            </PaginationItem>
          )
        }
      }
      if (totalPage - startPage >= groupCount + 1) {
        pages.push(
          <PaginationItem key={-2}><PaginationLink>···</PaginationLink></PaginationItem>
        )
      }
      pages.push(
        <PaginationItem key={totalPage} active={currentPage === totalPage}>
          <PaginationLink onClick={() => this.props.onChangePage(totalPage)}>
            {totalPage}
          </PaginationLink>
        </PaginationItem>
      )
    }
    pages.push(
      <PaginationItem key={totalPage + 1} disabled={currentPage === totalPage}>
        <PaginationLink next onClick={() => this.props.onChangePage(currentPage + 1)} />
      </PaginationItem>
    )
    return pages;

  }
  render() {
    return (
      <Pagination aria-label="Page navigation example" className="d-flex justify-content-center">
        {this.createPage()}
      </Pagination>
    )
  }
}


