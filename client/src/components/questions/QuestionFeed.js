import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QuestionItem from './QuestionItem';

class QuestionFeed extends Component {
  render() {
    const { questions } = this.props;

    return questions.map(question => <QuestionItem key={question._id} question={question} />);
  }
}

QuestionFeed.propTypes = {
  questions: PropTypes.array.isRequired
};

export default QuestionFeed;
