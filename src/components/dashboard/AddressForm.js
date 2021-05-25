import React, { Fragment } from "react";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../layout/Spinner";
import Button from "@material-ui/core/Button";
import { addAddress, changeAddress } from "../../actions/profile";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 0,
  },

  modalRoot: {
    maxWidth: 900,
    borderRadius: 0,
  },

  modalPaper: {
    padding: 20,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    maxHeight: "100vh",
    minHeight: "100%",
    borderRadius: 0,
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  typography: {
    padding: "5px 0",
  },

  headerText: {
    paddingBottom: "10px",
  },

  textField: {
    marginTop: 10,
  },

  button: {
    marginTop: 15,
    borderRadius: 0,
  },
}));

const AddressForm = ({
  auth,
  allAddresses,
  selectedCity,
  selectedDistrict,
  selectedSubdistrict,
  details,
  receiverName: addressReceiverName,
  mobileNumber: addressMobileNumber,
  isModal,
  closeModal,
  addressId,
  addAddress,
  changeAddress,
}) => {
  const classes = useStyles();
  const [addressDetails, setAddressDetails] = React.useState(details || "");
  const [receiverName, setReceiverName] = React.useState(
    addressReceiverName || ""
  );
  const [mobileNumber, setMobileNumber] = React.useState(
    addressMobileNumber || ""
  );
  const [city, setCity] = React.useState(selectedCity || "");
  const [district, setDistrict] = React.useState(selectedDistrict || "");
  const [subdistrict, setSubdistrict] = React.useState(
    selectedSubdistrict || ""
  );

  const cityHandleChange = (event) => {
    setCity(event.target.value);
  };

  const districtHandleChange = (event) => {
    setDistrict(event.target.value);
  };

  const subdistrictHandleChange = (event) => {
    setSubdistrict(event.target.value);
  };

  const onChange = (e, name) => {
    if (name === "details") {
      setAddressDetails(e.target.value);
    } else if (name === "receiver_name") {
      setReceiverName(e.target.value);
    } else if (name === "mobile_number") {
      setMobileNumber(e.target.value);
    }
  };

  const validate = () => {
    if (!city) {
      toast.warn("Хот сонгогдоогүй байна");
      return;
    }
    if (!district) {
      toast.warn("Дүүрэг сонгогдоогүй байна");
      return;
    }
    if (!subdistrict) {
      toast.warn("Хороо сонгогдоогүй байна");
      return;
    }
    if (addressDetails.trim() === "") {
      toast.warn("Дэлгэрэнгүй хаяг хоосон байна");
      return;
    }

    if (receiverName.trim() === "") {
      toast.error("Хүлээн авагчийн нэрний утга хоосон байна");
      return;
    }
    if (mobileNumber.trim() === "") {
      toast.error("Утасны дугаарын утга хоосон байна");
      return;
    }
  };

  const createAddress = () => {
    validate();

    addAddress({
      user_id: auth.user.id,
      city_id: city,
      district_id: district,
      subdistrict_id: subdistrict,
      details: addressDetails,
      receiver_name: receiverName,
      mobile_number: mobileNumber,
    });
  };

  const updateAddress = () => {
    validate();

    changeAddress({
      address_id: addressId,
      city_id: city,
      district_id: district,
      subdistrict_id: subdistrict,
      details: addressDetails,
      receiver_name: receiverName,
      mobile_number: mobileNumber,
    });
  };

  return allAddresses === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl
            style={{ width: "100%" }}
            className={classes.formControl}
          >
            <InputLabel style={{ width: "100%" }} id="demo-simple-select-label">
              Хот
            </InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={city}
              onChange={cityHandleChange}
            >
              {allAddresses.cities.map((city) => (
                <MenuItem value={city.id}>{city.city_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            style={{ width: "100%" }}
            className={classes.formControl}
          >
            <InputLabel style={{ width: "100%" }} id="demo-simple-select-label">
              Дүүрэг
            </InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={district}
              onChange={districtHandleChange}
            >
              {allAddresses.districts
                .filter((district) => district.city_id === city)
                .map((district) => (
                  <MenuItem value={district.id}>
                    {district.district_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl
            style={{ width: "100%" }}
            className={classes.formControl}
          >
            <InputLabel style={{ width: "100%" }} id="demo-simple-select-label">
              Хороо
            </InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={subdistrict}
              onChange={subdistrictHandleChange}
            >
              {allAddresses.subdistricts
                .filter((subdistrict) => subdistrict.district_id === district)
                .map((subdistrict) => (
                  <MenuItem value={subdistrict.id}>
                    {subdistrict.subdistrict_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="address"
            label="Хаяг (байр, орц, тоот)"
            variant="outlined"
            color="secondary"
            fullWidth
            size="small"
            value={addressDetails}
            className={classes.textField}
            onInput={(e) => onChange(e, "details")}
            required
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="address"
            label="Хүлээн авагчийн нэр"
            variant="outlined"
            color="secondary"
            fullWidth
            size="small"
            value={receiverName}
            className={classes.textField}
            onInput={(e) => onChange(e, "receiver_name")}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="address"
            label="Утасны дугаар"
            variant="outlined"
            color="secondary"
            fullWidth
            size="small"
            type="number"
            value={mobileNumber}
            className={classes.textField}
            onInput={(e) => onChange(e, "mobile_number")}
            required
          />
        </Grid>
      </Grid>
      {!isModal && (
        <Button
          onClick={() => createAddress()}
          variant="contained"
          color="secondary"
          size="large"
          className={classes.button}
        >
          Шинэ хаяг нэмэх
        </Button>
      )}

      {isModal && (
        <Grid container justify="space-between">
          <Grid item>
            <Button
              onClick={() => {
                updateAddress();
                closeModal();
              }}
              variant="contained"
              color="secondary"
              size="large"
              className={classes.button}
            >
              Хадгалах
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => closeModal()}
              variant="contained"
              color="default"
              size="large"
              className={classes.button}
            >
              Хаах
            </Button>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changeAddress, addAddress })(
  AddressForm
);
