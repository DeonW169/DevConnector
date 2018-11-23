import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createJob, getCurrentJob } from '../../actions/jobActions';
import isEmpty from '../../validation/is-empty';

class CreateJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      refNumber: '',
      salaryMin: '',
      salaryMax: '',
      salaryType: '',
      description: '',
      location: '',
      sector: '',
      skills: '',
      experience: '',
      education: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentJob();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.job.job) {
      const job = nextProps.job.job;

      // Bring arrays back to CSV
      const skillsCSV = job.skills.join(',');
      const educationCSV = job.education.join(',');
      const experienceCSV = job.experience.join(',');

      // If job field doesnt exist, make empty string
      // profile.company = !isEmpty(profile.company) ? profile.company : '';
      // profile.website = !isEmpty(profile.website) ? profile.website : '';
      // profile.location = !isEmpty(profile.location) ? profile.location : '';
      // profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

      // Set component fields state
      this.setState({
        title: job.title,
        refNumber: job.refNumber,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        salaryType: job.salaryType,
        description: job.description,
        location: job.location,
        sector: job.sector,
        skills: skillsCSV,
        experience: experienceCSV,
        education: educationCSV
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const jobData = {
      title: this.state.title,
      refNumber: this.state.refNumber,
      salaryMin: this.state.salaryMin,
      salaryMax: this.state.salaryMax,
      salaryType: this.state.salaryType,
      description: this.state.description,
      location: this.state.location,
      sector: this.state.sector,
      skills: this.state.skills,
      experience: this.state.experience,
      education: this.state.education
    };

    this.props.createJob(jobData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for salary type
    const options = [
      { label: '* Select Salary Type', value: 0 },
      { label: 'Monthly', value: 'Monthly' },
      { label: 'Annually', value: 'Annually' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="The title of the job advert"
                />
                <TextFieldGroup
                  placeholder="Reference number"
                  name="refNumber"
                  value={this.state.refNumber}
                  onChange={this.onChange}
                  error={errors.refNumber}
                  info="Enter a reference number for the advert"
                />
                <InputGroup
                  placeholder="Minimum Salary"
                  name="salaryMin"
                  icon="fab fa-sort-numeric-down"
                  value={this.state.salaryMin}
                  onChange={this.onChange}
                  error={errors.salaryMin}
                />
                <InputGroup
                  placeholder="Maximum Salary"
                  name="salaryMax"
                  icon="fab fa-sort-numeric-up"
                  value={this.state.salaryMax}
                  onChange={this.onChange}
                  error={errors.salaryMax}
                />
                <SelectListGroup
                  placeholder="Salary Type"
                  name="salaryType"
                  value={this.state.salaryType}
                  onChange={this.onChange}
                  options={options}
                  error={errors.salaryType}
                  info="
                  Is this salary per month, or per year?"
                />
                <TextFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Enter the description of the role"
                />
                <TextFieldGroup
                  placeholder="Sector"
                  name="sector"
                  value={this.state.sector}
                  onChange={this.onChange}
                  error={errors.sector}
                  info="Enter role sector. ex. finance, IT"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="* Experience"
                  name="experience"
                  value={this.state.experience}
                  onChange={this.onChange}
                  error={errors.experience}
                  info="Please use comma separated values (eg. 3yrs Agile, 2yrs Mobile)"
                />
                <TextFieldGroup
                  placeholder="* Education"
                  name="education"
                  value={this.state.education}
                  onChange={this.onChange}
                  error={errors.education}
                  info="Please use comma separated values (eg. Bcs Degree, Diploma in Xamarin)"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateJob.propTypes = {
  createJob: PropTypes.func.isRequired,
  getCurrentJob: PropTypes.func.isRequired,
  job: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  job: state.job,
  errors: state.errors
});

export default connect(mapStateToProps, { createJob, getCurrentJob })(
  withRouter(CreateJob)
);
