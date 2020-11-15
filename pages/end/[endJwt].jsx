import React from 'react';
import ErrorPage from '../../components/ErrorPage';
import PollSummary from '../../components/PollSummary';
import Content from '../../components/Content';

function isEndObject(x) {
    return typeof x == 'object' && 'uuid' in x && 'started' in x;
}
export const getServerSideProps = async (context) => {
    const baseUrl = process.env.BASE_URL;

    // Send off end JWT
    let resp = await fetch(baseUrl + '/getResults', {
        method: 'POST',
        body: JSON.stringify({
            endJwt: context.params.endJwt
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    resp = await resp.json();
    return {
        props: resp
    };

    // return {
    //     props: {"poll":{"uuid":"887d5231-54b4-48c6-8361-60742408edcb","question":"What's your name?","freeResponse":true},"count":8,"url":"https://storage.googleapis.com/freeresponse-output/887d5231-54b4-48c6-8361-60742408edcb.txt"}
    // }

    // return {
    //     props: {"poll":{"uuid":"48e7eff1-f28c-4ef1-ae9d-53b9377f9b11","question":"What's your favourite colour?","responses":["Red","Green","Blue"]},"count":4,"counts":{"1":2,"2":2}}
    // }
}


export default ({ errors, poll, count, counts, url }) => {
    if (errors) {
        let flat = Object.values(errors).flat();
        let msg = flat.join(", ");
        return (
            <ErrorPage msg={msg} />
        )
    }

    return (
        <Content>
            <PollSummary poll={poll} count={count} counts={counts} url={url} />
        </Content>
    );
};