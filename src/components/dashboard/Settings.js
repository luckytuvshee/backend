import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { changeInformation } from "../../actions/auth";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    marginTop: 30,
    borderRadius: 0,
  },

  typography: {
    fontFamily: "Pacifico",
  },

  textField: {
    marginTop: 15,
  },

  button: {
    marginTop: 15,
    borderRadius: 0,
  },
});

const Settings = ({ auth: { user }, changeInformation }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    mobile_number: user.mobile_number,
    password: "",
    password_confirmation: "",
  });

  const {
    first_name,
    last_name,
    mobile_number,
    password,
    password_confirmation,
  } = formData;

  const onChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const onSubmit = () => {
    if (formData.first_name.trim() === "") {
      toast.error("Нэр хоосон утгатай байна");
      return;
    }

    if (formData.last_name.trim() === "") {
      toast.error("Овог хоосон утгатай байна");
      return;
    }

    if (formData.mobile_number.trim() === "") {
      toast.error("Утасны дугаар хоосон утгатай байна");
      return;
    }

    if (
      formData.password.trim() !== "" &&
      formData.password !== formData.password_confirmation
    ) {
      toast.error("Нууц үгнүүд адилхан биш байна");
      return;
    }

    changeInformation(user.id, formData);

    toast.success("Таны мэдээлэл амжилттай өөрчлөгдлөө");

    setFormData({
      ...formData,
      password: "",
      password_confirmation: "",
    });
  };

  return (
    <div>
      <form
        className={classes.root}
        onSubmit={(e) => onSubmit(e)}
        autoComplete="off"
      >
        <TextField
          label="Овог"
          variant="outlined"
          color="secondary"
          size="small"
          className={classes.textField}
          value={last_name}
          onInput={(e) => onChange(e, "last_name")}
          fullWidth
          required
        />
        <TextField
          label="Нэр"
          variant="outlined"
          color="secondary"
          size="small"
          className={classes.textField}
          value={first_name}
          onInput={(e) => onChange(e, "first_name")}
          fullWidth
          required
        />

        <TextField
          label="Утасны дугаар"
          variant="outlined"
          color="secondary"
          size="small"
          className={classes.textField}
          value={mobile_number}
          onInput={(e) => onChange(e, "mobile_number")}
          fullWidth
          required
        />

        <TextField
          label="Нууц үг"
          variant="outlined"
          color="secondary"
          size="small"
          className={classes.textField}
          value={password}
          onInput={(e) => onChange(e, "password")}
          fullWidth
          type="password"
          required
        />

        <TextField
          label="Нууц үг давтах"
          variant="outlined"
          color="secondary"
          size="small"
          className={classes.textField}
          value={password_confirmation}
          onInput={(e) => onChange(e, "password_confirmation")}
          fullWidth
          type="password"
          required
        />

        <Button
          onClick={() => onSubmit()}
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
        >
          Хадгалах
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changeInformation })(Settings);
