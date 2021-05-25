import React, { Fragment } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../layout/Spinner";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import AddressItem from "./AddressItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AddressForm from "./AddressForm";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 0,
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

const Shipping = ({
  auth: { loading, user },
  profile: { userAddresses, allAddresses },
}) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [addressId, setAddressId] = React.useState(null);

  const [selectedCity, setSelectedCity] = React.useState(0);
  const [selectedDistrict, setSelectedDistrict] = React.useState(0);
  const [selectedSubdistrict, setSelectedSubdistrict] = React.useState(0);
  const [details, setDetails] = React.useState("");
  const [receiver_name, setReceiverName] = React.useState("");
  const [mobile_number, setMobileNumber] = React.useState("");

  const handleOpen = (info) => {
    setSelectedCity(info.city_id || 0);
    setSelectedDistrict(info.district_id || 0);
    setSelectedSubdistrict(info.subdistrict_id);
    setReceiverName(info.receiver_name || "");
    setMobileNumber(info.mobile_number || "");
    setDetails(info.details || "");
    setAddressId(info.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return loading || user === null || allAddresses === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {userAddresses.map((address) => (
        <Paper className={classes.root}>
          <AddressItem modalOpen={handleOpen} address={address} />
        </Paper>
      ))}
      <Paper className={classes.root}>
        <Typography className={classes.headerText} variant="h5">
          Хүргэлтийн мэдээлэл нэмэх
        </Typography>

        <form className={classes.root} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <AddressForm allAddresses={allAddresses} />
          </Grid>
        </form>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
        >
          <Paper className={classes.modalRoot}>
            <CardContent>
              <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={2}>
                  <AddressForm
                    allAddresses={allAddresses}
                    selectedCity={selectedCity}
                    selectedDistrict={selectedDistrict}
                    selectedSubdistrict={selectedSubdistrict}
                    details={details}
                    receiverName={receiver_name}
                    mobileNumber={mobile_number}
                    isModal={true}
                    closeModal={handleClose}
                    addressId={addressId}
                  />
                </Grid>
              </form>
            </CardContent>
          </Paper>
        </Modal>
      </Paper>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps)(Shipping);
