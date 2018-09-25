import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAnswer } from '../../actions/questionActions';

class AnswerItem extends Component {
  onDeleteClick(questionId, answerId) {
    this.props.deleteAnswer(questionId, answerId);
  }

  render() {
    const { answer, questionId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="#">
              <img
                className="rounded-circle d-none d-md-block"
                src={answer.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{answer.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{answer.text}</p>
            {answer.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, questionId, answer._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

AnswerItem.propTypes = {
  deleteAnswer: PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired,
  answerId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteAnswer })(AnswerItem);
