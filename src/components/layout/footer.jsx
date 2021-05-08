import { Box, Divider, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  textStyle: {
    marginTop: theme.spacing(2.5),
    alignItems: 'center',
    justify: 'center',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div>
      <Divider />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography className={classes.textStyle} variant="body1">
          Copyright:{' '}
          <Link href="/#" variant="body1">
            Benzene Technologies
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Footer;
