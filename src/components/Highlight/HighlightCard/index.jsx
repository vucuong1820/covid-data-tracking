import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

HighlightCard.propTypes = {
    title: PropTypes.string,
    count: PropTypes.number,
};

const useStyles = makeStyles({
    wrapper: (props) => {
        switch (props.type) {
            case 'confirmed':
                return { borderLeft: '5px solid #c9302c'}
            case 'recovered':
                return { borderLeft: '5px solid #28a745'}
            default:
                return { borderLeft: '5px solid grey'}
        }
    },
    title: {
        fontSize: 18, marginBottom: 5
    },
    count: {
        fontWeight: 'bold', fontSize: 18
    }
})

function HighlightCard({title, count, type}) {
    const classes = useStyles({type})
  return (
    <Card className={classes.wrapper}>
      <CardContent>
        <Typography variant="body2" component="p" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" component="span" className={classes.count}>
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default HighlightCard;
