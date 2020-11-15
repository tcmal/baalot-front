import React from 'react'
import Link from 'next/link';
import CreatePollForm from '../components/CreatePollForm';
import Content from '../components/Content';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const getStaticProps = async (context) => {
    return {
        props: {
            baseUrl: process.env.BASE_URL,
            frontBaseUrl: process.env.FRONT_BASE_URL
        }
    }
}

export default class CreatePollPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            done: false,
            errors: [],
        };
    }

    handleSubmit = (poll) => {
        const { baseUrl, frontBaseUrl } = this.props;

        if (poll.freeResponse) {
            delete poll.responses;
        }
        fetch(baseUrl + "/createPoll", {
            method: "POST",
            body: JSON.stringify(poll),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(x => {
                if (x.jwt) {
                    let url = frontBaseUrl + "vote/" + x.jwt;
                    this.setState({ ...this.state,
                        done: true,
                        loading: false,
                        url,
                        endJwt: x.endJwt
                    });
                } else {
                    this.setState({ ...this.state, errors: x.errors.errors, loading: false });
                }
            }).catch(e => {
                this.setState({...this.state, errors: {all: [e.toString()]}});
            });
    }

    render() {
        const { loading, done, errors } = this.state;

        if (done) {
            const { url, endJwt } = this.state;

            return (
                <Content>
                    <Typography variant="h4">Poll created successfuly!</Typography>
                    <Typography variant="body1" gutterBottom>Use this link:</Typography>
                    <div>
                        <TextField
                            label="Click to copy"
                            inputProps={{
                                readOnly: true,
                                onClick: e => {navigator.clipboard.writeText(url)}
                            }}
                            value={url}
                            fullWidth
                            />
                    </div>
                    <br />
                    <Link href={"/end/" + endJwt}>
                        <Button variant="contained" color="primary">End Poll</Button>
                    </Link>
                </Content>
            );
        }

        return (
            <Content>
                <Typography variant="h2" gutterBottom>Create a poll</Typography>
                <CreatePollForm onSubmit={this.handleSubmit} />
                <Backdrop open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {Object.values(errors).flat().map((x,i) => <li key={i}>{x}</li>)}
            </Content>
        );
    }
}