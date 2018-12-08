import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import JobHeader from './JobHeader';
import JobAbout from './JobAbout';
import JobCreds from './JobCreds';
import Spinner from '../common/Spinner';
import { getJobById } from '../../actions/jobActions';

class Job extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getJobById(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.job.job === null && this.props.job.loading) {
      this.props.history.push('/not-found');
    }
  }

  render() {
    const { job, loading } = this.props.job;
    let jobContent;

    if (job === null || loading) {
      jobContent = <Spinner />;
    } else {
      jobContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/job" className="btn btn-light mb-3 float-left">
                Back To Job adverts
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <JobHeader job={job} />
          <JobAbout job={job} />
          <JobCreds
            education={job.education}
            experience={job.experience}
          />
        </div>
      );
    }

    return (
      <div className="job">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{jobContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Job.propTypes = {
  getJobById: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job
});

export default connect(mapStateToProps, { getJobById })(Job);
