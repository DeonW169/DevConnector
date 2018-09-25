import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deleteQuestion } from '../../actions/questionActions';

class QuestionItem extends Component {
  onDeleteClick(id) {
    this.props.deleteQuestion(id);
  }

  render() {
    const { question, auth, showActions } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="#">
              <img
                className="rounded-circle d-none d-md-block"
                src={question.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{question.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{question.text}</p>
            {showActions ? (
              <span>
                
                <Link to={`/question/${question._id}`} className="btn btn-info mr-1">
                  Answers
                </Link>
                {question.user === auth.user.id ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, question._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

QuestionItem.defaultProps = {
  showActions: true
};

QuestionItem.propTypes = {
  deleteQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteQuestion })(
  QuestionItem
);
