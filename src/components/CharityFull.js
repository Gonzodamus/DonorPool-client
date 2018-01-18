import React from "react";
import { Card, CardBody, CardTitle, CardImg, Button } from "reactstrap";
import { connect } from "react-redux";
import * as actions from "../actions";

class Charity extends React.Component {
  render() {
    const { charity } = this.props;

    return (
      <div>
        {this.props.supported.length > 1 ? (
          <button onClick={this.props.resetSearch}>Back</button>
        ) : null}
        <Card style={{ margin: "5px" }}>
          <CardBody>
            <CardTitle>
              <img
                src={charity.icon}
                alt={charity.name}
                className="fullCardImage"
              />
              {charity.name}
            </CardTitle>

            <div style={{ maxHeight: "500px", overflow: "hidden" }}>
              <CardImg src={charity.picture} alt={charity.name} />
            </div>

            <div className="byLine">{charity.tagline}</div>
            <div style={{ float: "right" }}>
              <a href={charity.URL} target="_blank">
                Website
              </a>
            </div>
            <ul>
              <div>Catgory: {charity.category}</div>
              <div>Cause: {charity.cause}</div>
            </ul>
            <div>{charity.mission}</div>
            <Button style={{ float: "right" }}> Support {charity.name} </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  supported: state.auth.user.supported
});

export default connect(mapStateToProps, actions)(Charity);
