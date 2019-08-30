import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class JobAbout extends Component {
  render() {
    const { job } = this.props;

    // Get first name
    const title = job.title;

    // Skill List
    const skills = job.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{title}</h3>
            <p className="lead">
              {isEmpty(job.description) ? (
                <span>{title} does not have a description</span>
              ) : (
                <span>{job.description}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

JobAbout.propTypes = {
  job: PropTypes.object.isRequired
};

export default JobAbout;
