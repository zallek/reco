import React, { PropTypes, Component } from 'react';
import TagsInput from 'react-tagsinput';


class SegmentStudy extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.interval = setInterval(() => this.tick(), 1000);
  }

  handleScopeChange(e) {

  }

  render() {
    const { name, segments } = this.props;
    return (
      <div className="SegmentStudy">
        <h2>{name}</h2>
        <TagsInput value={segments} onChange={this.handleScopeChange} />
      </div>
    );
  }
}

SegmentStudy.propTypes = {
  data: PropTypes.object.isRequired,
  segments: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
};

export default SegmentStudy;
