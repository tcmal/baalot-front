import React from 'react';
import { decode } from 'jsonwebtoken';
import { GetServerSideProps } from 'next';
import VoteDialog from '../../components/VoteDialog';
import ErrorPage from '../../components/ErrorPage';
import Content from '../../components/Content';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

function isPollObject(x) {
    return typeof x == 'object' && 'uuid' in x && 'question' in x && ('responses' in x || x.freeResponse);
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
            loading: false,
            done: false,
            errors: [],
        };
    }

    handleSubmit = (resp) => {
        const { baseUrl, jwt, poll } = this.props;
        this.setState({ ...this.state, loading: true });

        let data = {
            pollJwt: jwt
        };

        if (poll.freeResponse) {
            data.customResponse = resp;
        } else {
            data.responseIdx = poll.responses.indexOf(resp).toString();
        }

        fetch(baseUrl + "/addVote", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(x => {
                if (x.success) {
                    this.setState({ ...this.state, done: true, loading: false });
                } else {
                    this.setState({ ...this.state, errors: x.errors, loading: false });
                }
            }).catch(e => {
                this.setState({...this.state, loading: false, errors: {all: [e.toString()]}});
            });
    }

    render() {
        const { poll, invalid } = this.props;
        const { loading, done, errors } = this.state;

        if (invalid) {
            return (
                <ErrorPage msg="Invalid JWT" />
            );
        }

        if (done) {
            return (
                <Content>
                    <h1>Vote recorded successfully!</h1>
                </Content>
            );
        }

        return (
            <Content>
                {loading ? 
                    <CircularProgress /> :
                    <VoteDialog poll={poll} onSubmit={this.handleSubmit} />
                }
                {Object.values(errors).flat().map((x,i) => <li key={i}>{x}</li>)}
            </Content>
        );
    }
}