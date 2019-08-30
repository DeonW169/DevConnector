import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class JobHeader extends Component {
  render() {
    const { job } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{job.title}</h1>
              <p className="lead text-center">
                {isEmpty(job.sector) ? null : (
                  <span>in {job.location}</span>
                )}
              </p>
              <p>
                some header content
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JobHeader;
