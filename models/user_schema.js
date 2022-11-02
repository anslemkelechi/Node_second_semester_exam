const moogoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define a schema
const Schema = moogoose.Schema;

//Define book schema
const UserSchema = new Schema({
  id: moogoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: [true, "your email is required"],
    unique: true,
  },
  firstname: {
    type: String,
    //  required: true
  },
  lastname: {
    type: String,
    // required: true,
    max: [2022, "Year must be less than or equal to 2020"], //validation with custom message
  },
  password: {
    type: String,
    // required: true,
    //validation with custom message
  },
  timestamps: Date,
});



UserSchema.pre(
  'save',
  async function (next) {
      const user = this;
      const hash = await bcrypt.hash(this.password, 10);

      this.password = hash;
      next();
  }
);

// You will also need to make sure that the user trying to log in has the correct credentials. Add the following new method:
UserSchema.methods.isValidPassword = async function(password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}
// Export the model
module.exports = moogoose.model('User', UserSchema);