import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default ({ msg }) => (
    <Container>
        <Typography variant="h3" color="secondary">Uh-oh.</Typography>

        <Typography variant="h4">{msg}</Typography>
    </Container>
);