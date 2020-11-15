import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

export default class CreatePollForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            question: "",
            freeResponse: false,
            responses: [""],
            errors: {}
        };
    }

    setField = (key, val) => {
        this.setState({...this.state, [key]: val});
    }

    setResponse = (idx, val) => {
        const { responses } = this.state;
        if (idx > 0 && val === "") {
            delete responses[idx];
        } else {
            responses[idx] = val;
        }

        this.setState({...this.state, responses});
    }

    addResponse = () => {
        const { responses } = this.state;
        responses.push("");

        this.setState({...this.state, responses});
    }

    attemptSubmit = () => {
        const { onSubmit } = this.props;
        const { question, freeResponse } = this.state;
        let { responses } = this.state;

        let errors = {};
        if (question.length < 8 || question.length > 250) {
            errors.question = "Question must be between 8 and 250 characters";
        }

        responses = responses.filter(x => x.length > 0);

        this.setState({...this.state, responses});

        if (!freeResponse && responses.length === 0) {
            errors.responses = "Must have at least one response";
        }

        if (Object.values(errors).length !== 0) {
            return this.setState({...this.state, errors});
        }

        onSubmit({
            question, freeResponse, responses
        });
    }

    render() {
        const { question, freeResponse, responses, lastResp, errors } = this.state;

        return (
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} md={9}>
                    {errors.question ? <p>{errors.question}</p> : ''}
                    <TextField onChange={e => this.setField('question', e.target.value)}
                               value={question} label={"Question"} fullWidth required autoFocus={true}
                               error={errors.question} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={freeResponse}
                                onChange={e => this.setField('freeResponse', e.target.checked)}
                                name="freeResponse"
                            />
                        }
                        label="Allow free response?"
                    />
                </Grid>
                {freeResponse ? '' : responses.map((v, i) => 
                    <Grid item xs={12} key={i}>
                        <TextField onKeyPress={e => e.key == 'Enter' ? this.addResponse() : false}
                                   onChange={e => this.setResponse(i, e.target.value)}
                                   autoFocus
                                   value={v} label={"Option #" + (i + 1)} fullWidth
                                   error={errors.responses} />
                    </Grid>
                )}

                <Grid item xs={9} md={2}>
                    <Button variant="contained" color="primary" fullWidth onClick={this.attemptSubmit}>Create</Button>
                    {errors.responses ? <p>{errors.responses}</p> : ''}
                </Grid>
                
                {freeResponse ? '' : 
                    <Grid item xs={1}>
                        <IconButton onClick={_ => this.addResponse()}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                }
            </Grid>
        );
    }
}