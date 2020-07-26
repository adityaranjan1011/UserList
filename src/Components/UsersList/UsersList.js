import React, { Component } from "react";
import "./UsersList.css";
import Button from "@material-ui/core/Button";
import { Modal } from "@material-ui/core";
import DateTimeRange from "../DateTimeRange/DateTimeRange";
import UserData from "../../db.json";

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      name: " ",
      showModal: false,
      open: false,
      viewOpen: false,
      activity: [],
      user_data: " ",
    };
  }
  // componentWillMount(){}

  componentDidMount() {
    UserData.members.map((data, index) => {
      // console.log(data);
      if (index === 0) {
        this.setState({
          userName: data.real_name,
        });
      } else {
        this.setState({
          name: data.real_name,
        });
      }
    });
  }


  handleOpen = () => {
    this.setState({
      showModal: true,
      open: true,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      open: false,
    });
  };
  viewAllOpen = () => {
    if (this.state.open) {
      this.setState({
        viewOpen: true,
      });
    }

    UserData.members.map((data, index) => {

      for (let i = 0; i < data.activity_periods.length; i++) {
        this.state.activity.push(data.activity_periods[i]);
      }
    });
  };
  viewClose = () => {
    this.setState({
      viewOpen: false,
      activity:[]
    });
  };
  render() {
  
    return (
      <div className="UsersList">
        <div className="users-btn">
          <Button
            variant="contained"
            className="btns"
            onClick={this.handleOpen}
          >
            {" "}
            {this.state.userName}
          </Button>
          <Button variant="contained" className="btn" onClick={this.handleOpen}>
            {" "}
            {this.state.name}
          </Button>
        </div>
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="modalbox">
            <h2>Time Range </h2>
            <DateTimeRange />
            <Button
              variant="contained"
              className="view_btn"
              onClick={this.viewAllOpen}
              color="primary"
            >
              View All
            </Button>
          </div>
        </Modal>
       
        <Modal
          open={this.state.viewOpen}
          onClose={this.viewClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="viewbox">
            <h2>View All </h2>            
            {this.state.activity.map((data,index) => (
              <div className="activity_period">              
                <p key={index}> Start Time  {data.start_time}</p>
                <p key={index} >End Time {data.end_time}</p>   
                </div>           
            ))}
            {/* </div> */}
          </div>
        </Modal>
      </div>
    );
  }
}

export default UsersList;
