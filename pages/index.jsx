import React from 'react'
import Link from 'next/link'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Content from '../components/Content';
import styles from './index.module.css';

export default () => (
  <Content>
        <div className={styles.center}>
            <p>Lightning fast straw polls with cloud technology.</p>
            <Link href="/create">
                <Button variant="contained" color="primary">Create a poll</Button>
            </Link>
        </div>
  </Content>
)
