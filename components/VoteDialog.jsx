import styles from './VoteDialog.module.css';
import Button from '@material-ui/core/Button';

const Response = ({ selected, setResponse, val }) => (
    <div onClick={_ => setResponse(val)} className={styles.fixedResponse + ' ' + (selected ? styles.active : '')}>
        <p>{val}</p>
    </div>
);

export default class VoteDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedResponse: ""
        };
    }

    setResponse = (resp) => {
        this.setState({ ...this.state, selectedResponse: resp });
    }

    render() {
        const { poll, onSubmit } = this.props;
        const { selectedResponse } = this.state;

        return (
            <main className={styles.container}>
                <h1 className={styles.question}>{poll.question}</h1>
                {poll.free_response ? 
                    'free response'
                    : poll.responses.map((x,i) => <Response key={i} selected={x == selectedResponse} setResponse={this.setResponse} val={x} />)}
                <Button onClick={_ => onSubmit(selectedResponse)}>Submit</Button>
            </main>
        );
    }
}