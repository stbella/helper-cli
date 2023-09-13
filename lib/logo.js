const chalk = require('chalk')
const figlet = require("figlet")

module.exports = () => {
  console.log(
    chalk.cyan(
      figlet.textSync("Helper CLI", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 70
      })
    )
  );
}
