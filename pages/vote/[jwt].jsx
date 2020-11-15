import React from 'react';
import { decode } from 'jsonwebtoken';
import { GetServerSideProps } from 'next';
import VoteDialog from '../../components/VoteDialog';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function isPollObject(x) {
    return typeof x == 'object' && 'uuid' in x && 'question' in x && ('responses' in x || x.free_response);
}

export const getServerSideProps = async (context) => {
    // Decode JWT token
    if (!context.params || !context.params.jwt) {
        return {props: {invalid: true}};
    }

    let poll = await decode(context.params.jwt);
    if (!isPollObject(poll)) {
        return {
            props: {invalid: true}
        };
    }

    return {
        props: {
            baseUrl: process.env.BASE_URL || "http://localhost:8080/",
            jwt: context.params.jwt,
            poll
        }
    }
}


export default class VotePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    handleSubmit = (resp) => {
        const { baseUrl, jwt, poll } = this.props;
        this.setState({ ...this.state, loading: true });

        let data = {
            poll_jwt: jwt
        };
        console.log(poll, resp);
        if (poll.free_response) {
            data.custom_response = resp;
        } else {
            data.response_idx = poll.responses.indexOf(resp);
        }

        fetch(baseUrl + "/addVote", {
            method: "POST",
            body: JSON.stringify({
                poll_jwt: jwt
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(console.log);
    }

    render() {
        const { poll, invalid } = this.props;
        const { loading } = this.state;

        if (invalid) {
            return (<h1>Invalid!</h1>);
        }

        return (
            <div>
                <VoteDialog poll={poll} onSubmit={this.handleSubmit} />
                <Backdrop open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }
}