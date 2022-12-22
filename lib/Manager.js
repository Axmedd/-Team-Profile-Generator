// importing Employee constructor
const Employee = require("./Employee");

// manager constructor extends employee constructor
class Manager extends Employee {
  constructor(name, id, email, number) {
    // calling employee constructor
    super(name, id, email);

    this.number = number;
  }

  // override employee role to manager
  getRole() {
    return "Manager";
  }
}

// to be exported
module.exports = Manager;
