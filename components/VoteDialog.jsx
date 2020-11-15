import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default class VoteDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedResponse: "",
            error: false
        };
    }

    setResponse = (resp) => {
        this.setState({ ...this.state, selectedResponse: resp });
    }

    attemptSubmit = (_) => {
        const { onSubmit } = this.props;
        const { selectedResponse } = this.state;

        if (selectedResponse.length > 0 && selectedResponse.length <= 250) {
            onSubmit(selectedResponse);
        } else {
            this.setState({ ...this.state, error: true });
        }
    }

    render() {
        const { poll, onSubmit } = this.props;
        const { selectedResponse, error } = this.state;

        return (
            <div>
                <Typography variant="h2" gutterBottom>{poll.question}</Typography>
                <Card>
                    <CardContent>
                        {error ? <p>{poll.freeResponse ? 'Please type a response' : 'Please select a response'}</p> : ''}
                        {poll.freeResponse ? 
                            <TextField variant="outlined" fullWidth label="Response" required
                                onChange={e => this.setResponse(e.target.value)}
                                value={selectedResponse} error={error} /> :
                            <RadioGroup value={selectedResponse} onChange={e => this.setResponse(e.target.value)}>
                                {poll.responses.map((x,i) =>
                                    <FormControlLabel key={i}
                                        value={x}
                                        label={x}
                                        control={<Radio />} />
                                )}
                            </RadioGroup>
                        }
                    </CardContent>
                    <CardActions>
                        <Button onClick={this.attemptSubmit} fullWidth>Submit</Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}