import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AnswerItem from './AnswerItem';

class AnswerFeed extends Component {
  render() {
    const { answers, questionId } = this.props;

    return answers.map(answer => (
      <AnswerItem key={answer._id} answer={answer} questionId={questionId} />
    ));
  }
}

AnswerFeed.propTypes = {
  answers: PropTypes.array.isRequired,
  questionId: PropTypes.string.isRequired
};

export default AnswerFeed;
