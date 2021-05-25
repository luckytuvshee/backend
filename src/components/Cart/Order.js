import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import { addAddress } from "../../actions/profile";
import { setOrderAddress } from "../../actions/order";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    background: "#cfe8fc",
    backgroundSize: "contain",
    margin: "auto",
    marginTop: 50,
    padding: 20,
    borderRadius: 0,
  },

  cardContent: {
    minWidth: 345,
    padding: "10px 0 0 0",
  },

  button: {
    marginTop: 20,
    borderRadius: 0,
  },

  textField: {
    marginTop: 10,
  },
}));

const Order = ({
  profile: { loading, userAddresses, allAddresses },
  auth,
  addAddress,
  history,
  setOrderAddress,
  location,
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!location.fromLink) history.push("/");
  }, []);

  const [selectedAddressId, setSelectedAddressId] = React.useState(-1);

  const [showAddressForm, toggleAddressForm] = React.useState(
    !auth.isAuthenticated
  );

  const addressHandleChange = (event) => {
    setSelectedAddressId(event.target.value);
  };

  const [addressDetails, setAddressDetails] = React.useState("");
  const [addressReceiverName, setAddressReceiverName] = React.useState("");
  const [addressMobileNumber, setAddressMobileNumber] = React.useState("");
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [subdistrict, setSubdistrict] = React.useState("");

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
    } else if (name === "mobile_number") {
      setAddressMobileNumber(e.target.value);
    } else if (name === "receiver_name") {
      setAddressReceiverName(e.target.value);
    }
  };

  const toggleHandler = () => {
    toggleAddressForm(!showAddressForm);
    setSelectedAddressId(-1);
  };

  const makeOrder = () => {
    if (!showAddressForm) {
      if (userAddresses.length === 0) {
        toast.warn("Та шинэ хаяг нээж захиалгаа үргэжлүүлнэ үү");
        return;
      }

      if (selectedAddressId === -1) {
        toast.warn("Хаяг сонгогдоогүй байна");
        return;
      }

      setOrderAddress(selectedAddressId);
      history.push({ pathname: "/payment", fromLink: true });
    }

    if (showAddressForm) {
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

      if (addressReceiverName.trim() === "") {
        toast.warn("Захиалгийг хүлээн авагчийн нэр хоосон байна");
        return;
      }

      if (addressMobileNumber.trim() === "") {
        toast.warn("Утасны дугаар хоосон байна");
        return;
      }

      addAddress({
        user_id: auth.isAuthenticated ? auth.user.id : 1, // 1 is GUEST user.
        city_id: city,
        district_id: district,
        subdistrict_id: subdistrict,
        receiver_name: addressReceiverName,
        mobile_number: addressMobileNumber,
        details: addressDetails,
      });
      setOrderAddress(-1);
      history.push({ pathname: "/payment", fromLink: true });
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Card
      className={classes.root}
      style={{
        background: "#fff",
      }}
    >
      <CardContent className={classes.cardContent}>
        <FormControl style={{ width: "100%" }} component="fieldset">
          <Typography variant="h6" color="textSecondary" component="p">
            Захиалга хүргэгдэх хаяг
          </Typography>
          {!showAddressForm && (
            <Fragment>
              {userAddresses.length === 0 && (
                <strong style={{ marginTop: 12 }}>
                  Хаяг олдсонгүй, та "ШИНЭ ХАЯГААР ЗАХИАЛАХ" дээр дарж хаягаа
                  бүртгүүлнэ үү
                </strong>
              )}
              <Grid container justify="space-between" alignItems="center">
                <RadioGroup
                  name="addresses"
                  value={selectedAddressId}
                  onChange={addressHandleChange}
                >
                  {userAddresses.map((address) => (
                    <Grid item key={address.id}>
                      <FormControlLabel
                        value={address.id + ""}
                        control={<Radio />}
                      />
                      <strong>Хаяг:</strong>{" "}
                      {address.city_name && address.city_name + ", "}
                      {address.district_name && address.district_name + ", "}
                      {address.subdistrict_name &&
                        address.subdistrict_name + ", "}
                      {address.details && address.details}
                    </Grid>
                  ))}
                </RadioGroup>
              </Grid>
            </Fragment>
          )}

          {auth.isAuthenticated && (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={toggleHandler}
              className={classes.button}
            >
              {showAddressForm ? "Хаяг сонгох" : "Шинэ хаягаар захиалах"}
            </Button>
          )}

          {showAddressForm && (
            <Fragment>
              <Grid style={{ marginTop: 10 }} container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    style={{ width: "100%" }}
                    className={classes.formControl}
                  >
                    <InputLabel
                      style={{ width: "100%" }}
                      id="demo-simple-select-label"
                    >
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
                    <InputLabel
                      style={{ width: "100%" }}
                      id="demo-simple-select-label"
                    >
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
                    <InputLabel
                      style={{ width: "100%" }}
                      id="demo-simple-select-label"
                    >
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
                        .filter(
                          (subdistrict) => subdistrict.district_id === district
                        )
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
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="address"
                    label="Захиалгийг хүлээн авагчийн нэр"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    size="small"
                    value={addressReceiverName}
                    className={classes.textField}
                    onInput={(e) => onChange(e, "receiver_name")}
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
                    value={addressMobileNumber}
                    className={classes.textField}
                    onInput={(e) => onChange(e, "mobile_number")}
                  />
                </Grid>
              </Grid>
            </Fragment>
          )}
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                onClick={() => makeOrder()}
                variant="contained"
                color="default"
                size="large"
                className={classes.button}
              >
                Бараануудыг захиалах
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { addAddress, setOrderAddress })(
  withRouter(Order)
);
