import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withRouter } from "react-router-dom";

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event, path) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (path) => {
    setAnchorEl(null);
    props.history.push(path);
  };

  return (
    <div>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        Menu
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose("/employees")}>Employees</MenuItem>
        <MenuItem onClick={() => handleClose("/skills")}>Skills</MenuItem>
        <MenuItem onClick={() => handleClose("/add_employee")}>
          Add Employee
        </MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(SimpleMenu);
