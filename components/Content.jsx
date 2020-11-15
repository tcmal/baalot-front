import React from 'react';
import styles from './Content.module.css';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

export default ({ children }) => (
    <Container maxWidth="md">
        <header className={styles.header}>
            <Typography variant="h1" align="center" gutterBottom>
                <span className={styles.blue}>baa</span>lot
            </Typography>
        </header>
        <main>
            {children}
        </main>
        <footer className={styles.footer}>
            <Typography color="textSecondary" align="center" variant="subtitle1">
                made by <a href="https://github.com/tcmal">tcmal</a> as part of <a href="defhacks.co">defhacks</a>
            </Typography>
        </footer>
    </Container>
);