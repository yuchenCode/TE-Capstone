import React from "react";
import PropTypes from "prop-types";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import {
  Container,
  ButtonToolbar,
  ButtonGroup,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FloatGrid as Grid,
  Card,
  Media,
  CardBody,
  ListGroup,
  ListGroupItem,
  Progress,
  Table,
  CardFooter,
  Button,
  CardHeader,
} from "../../../components";
import { applyColumn } from "../../../components/FloatGrid";

import { HeaderMain } from "../../components/HeaderMain";

import { WebsitePerformance } from "../../components/Analytics/WebsitePerformance";
import { TinyAreaChart } from "../../components/Analytics/TinyAreaChart";
import { AreaChartFillByValue } from "./components/AreaChartFillByValue";

import classes from "./Statistics.scss";

const LAYOUT = {
  sessions: { md: 6, h: 6, maxH: 9, minW: 3 },
  spend: { md: 6, h: 7 },
  "website-performance": { md: 6, h: 11 },
};

const SessionByDevice = (props) => (
  <div className={classes["session"]}>
    <div className={classes["session__title"]}>{props.title}</div>
    <div className={classes["session__values"]}>
      <div className={`${classes["session__percentage"]} text-${props.color}`}>
        {props.valuePercent}%
      </div>
      <div className={`${classes["session__value"]} text-${props.color}`}>
        {props.value}
      </div>
    </div>
  </div>
);
SessionByDevice.propTypes = {
  title: PropTypes.node,
  color: PropTypes.string,
  valuePercent: PropTypes.string,
  value: PropTypes.string,
};

export class Statistics extends React.Component {
  state = {
    layouts: _.clone(LAYOUT),
  };

  _resetLayout = () => {
    this.setState({
      layouts: _.clone(LAYOUT),
    });
  };

  render() {
    const { layouts } = this.state;

    return (
      <React.Fragment>
        <Container fluid={false}>
          <div className="d-flex mt-3 mb-5">
            <HeaderMain title="Statistics" className="mt-0" />
            <ButtonToolbar className="ml-auto">
              <ButtonGroup className="align-self-start mr-2">
                <UncontrolledButtonDropdown className="ml-auto flex-column">
                  <DropdownToggle
                    color="link"
                    className="text-left pl-0 text-decoration-none mb-2"
                  >
                    <i className="fa fa-spinner text-body mr-2"></i>
                    Decision Tree
                    <i className="fa fa-angle-down text-body ml-2" />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Select Model:</DropdownItem>
                    <DropdownItem active>Decision Tree</DropdownItem>
                    <DropdownItem>Random Forest</DropdownItem>
                    <DropdownItem>Neural Network</DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </ButtonGroup>
              <ButtonGroup className="align-self-start">
                <Button color="primary" className="mb-2 mr-2 px-3">
                  Apply
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button
                  color="link"
                  className="mb-2 text-decoration-none align-self-start"
                  onClick={this._resetLayout}
                >
                  Reset
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </div>
        </Container>

        <Grid>
          <Grid.Row
            onLayoutChange={(layouts) => this.setState({ layouts })}
            columnSizes={this.state.layouts}
            rowHeight={55}
          >
            <Grid.Col {...applyColumn("spend", layouts)}>
              <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                              Process Capability Index (Cpk)
                            </h6>
                            <p>Update for each datapoint</p>
                        </div>
                    </div>
                    <AreaChartFillByValue />
                </CardBody>
              </Card>
            </Grid.Col>
            <Grid.Col {...applyColumn("website-performance", layouts)}>
              <Card>
                <CardHeader className="bb-0 pt-3 bg-none" tag="h6">
                  <i className="fa fa-ellipsis-v mr-2"></i> Model Performance
                </CardHeader>
                <ListGroup flush>
                  <ListGroupItem className="bt-0">
                    <WebsitePerformance
                      title="Mean Absolute Error (MAE)"
                      value="0.000349"
                      valuePercentIcon="caret-up"
                      valuePercentColor="text-success"
                      valuePercent="23,91"
                    />
                  </ListGroupItem>
                  <ListGroupItem className="bt-0">
                    <WebsitePerformance
                      title="Mean Squared Error (MSE)"
                      value="4.746285"
                      valuePercentColor="text-danger"
                      valuePercent="42,82"
                    />
                  </ListGroupItem>
                  <ListGroupItem className="bt-0">
                    <WebsitePerformance
                      title="Root Mean Squared Error (RMSE)"
                      value="0.006889"
                      valuePercentIcon="caret-up"
                      valuePercentColor="text-success"
                      valuePercent="23,91"
                    />
                  </ListGroupItem>
                  <ListGroupItem className="bt-0 bb-0">
                    <WebsitePerformance
                      title="R-squared (R²)"
                      value="0.696357"
                      valuePercentColor="text-danger"
                      valuePercent="65,28"
                    />
                  </ListGroupItem>
                </ListGroup>
                <CardFooter className="flex-grow-0 mt-auto">
                  <Media className="small">
                    <Media left>
                      <i className="fa fa-fw fa-info-circle mr-2"></i>
                    </Media>
                    <Media body>
                      Update for each epoch
                    </Media>
                  </Media>
                </CardFooter>
              </Card>
            </Grid.Col>
            <Grid.Col {...applyColumn("sessions", layouts)}>
              <Card>
                <CardHeader className="bb-0 pt-3 pb-0 bg-none" tag="h6">
                  <i className="fa fa-ellipsis-v text-body mr-2"></i> Predictions by if Qualified
                </CardHeader>
                <CardBody className="d-flex flex-column">
                  <div className={classes["sessions"]}>
                    <SessionByDevice
                      title="Qualified"
                      color="success"
                      valuePercent="85.9"
                      value="335546"
                    />
                    <SessionByDevice
                      title="Not Qualified"
                      color="danger"
                      valuePercent="14.1"
                      value="81,525"
                    />
                  </div>
                  <Progress
                    multi
                    className={classes["sessions-progress"]}
                    style={{ height: "5px" }}
                  >
                    <Progress
                      bar
                      color="success"
                      value="86"
                      style={{ height: "5px" }}
                    />
                    <Progress
                      bar
                      color="danger"
                      value="14"
                      style={{ height: "5px" }}
                    />
                  </Progress>
                </CardBody>
                <CardFooter className={`${classes["sessions-info"]} mt-auto`}>
                  <Media className="small">
                    <Media left>
                      <i className="fa fa-fw fa-info-circle mr-2"></i>
                    </Media>
                    <Media body>
                      Update for each epoch
                    </Media>
                  </Media>
                </CardFooter>
              </Card>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}
