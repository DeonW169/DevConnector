import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import QuestionItem from '../questions/QuestionItem';
import AnswerForm from './AnswerForm';
import AnswerFeed from './AnswerFeed';
import Spinner from '../common/Spinner';
import { getQuestion } from '../../actions/questionActions';

class Question extends Component {
  componentDidMount() {
    this.props.getQuestion(this.props.match.params.id);
  }

  render() {
    const { question, loading } = this.props.question;
    let questionContent;

    if (question === null || loading || Object.keys(question).length === 0) {
      questionContent = <Spinner />;
    } else {
      questionContent = (
        <div>
          <QuestionItem question={question} showActions={false} />
          <AnswerForm questionId={question._id} />
          <AnswerFeed questionId={question._id} answers={question.answers} />
        </div>
      );
    }

    return (
      <div className="question">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/ask-feed" className="btn btn-light mb-3">
                Back To Questions
              </Link>
              {questionContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  getQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  question: state.question
});

export default connect(mapStateToProps, { getQuestion })(Question);
