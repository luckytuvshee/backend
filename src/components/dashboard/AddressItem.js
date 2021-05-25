import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForeverOutlined';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { deleteAddress } from '../../actions/profile';

const AddressItem = ({
  address: {
    id,
    city_name,
    district_name,
    subdistrict_name,
    details,
    receiver_name,
    mobile_number,
    city_id,
    district_id,
    subdistrict_id,
  },
  modalOpen,
  deleteAddress,
}) => {
  return (
    <div>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <strong>Хаяг:</strong> {city_name && city_name + ', '}
          {district_name && district_name + ', '}
          {subdistrict_name && subdistrict_name + ', '}
          {receiver_name && receiver_name + ', '}
          {mobile_number && mobile_number + ', '}
          {details && details}
        </Grid>
        <Grid item>
          <Grid container spacing={3} justify="center">
            <Grid item>
              <IconButton>
                <DeleteForeverIcon
                  onClick={() => deleteAddress(id)}
                  style={{ fontSize: 30, color: '#F44336' }}
                />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => {
                  const info = {
                    id,
                    details,
                    receiver_name,
                    mobile_number,
                    city_id,
                    district_id,
                    subdistrict_id,
                  };
                  console.log(info);
                  modalOpen(info);
                }}
              >
                <EditIcon style={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(null, { deleteAddress })(AddressItem);
