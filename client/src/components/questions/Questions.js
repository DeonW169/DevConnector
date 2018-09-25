import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionForm from './QuestionForm';
import QuestionFeed from './QuestionFeed';
import Spinner from '../common/Spinner';
import { getQuestions } from '../../actions/questionActions';

class Questions extends Component {
  componentDidMount() {
    this.props.getQuestions();
  }

  render() {
    const { questions, loading } = this.props.question;
    let questionContent;

    if (questions === null || loading) {
      questionContent = <Spinner />;
    } else {
      questionContent = <QuestionFeed questions={questions} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <QuestionForm />
              {questionContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  question: state.question
});

export default connect(mapStateToProps, { getQuestions })(Questions);
