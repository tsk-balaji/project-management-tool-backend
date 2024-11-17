const bcrypt = require("bcryptjs");

(async () => {
  const plainPassword = "balaji1234";
  const hashedPassword =
    "$2a$10$0KfGZ9Ye8wlIC0x6etIRfOZzyWsjW9uK2naGP6c93AjkNrtztyWxG";

  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  console.log("Password match:", isMatch);
})();
