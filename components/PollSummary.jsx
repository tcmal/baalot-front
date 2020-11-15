import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export default ({ poll, counts, count, url }) => (
    <main>
        <Typography variant="h2" gutterBottom>{poll.question}</Typography>
        {poll.freeResponse ? 
            <Card elevation={3}>
                <CardContent>
                    <Grid container alignItems="center">
                        <Grid item xs={12} md={9}>
                            <Typography variant="h4">{count} responses</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Button href={url} target="_blank" fullWidth variant="contained" color="primary">Download (.txt)</Button>
                        </Grid>
                    </Grid>

                </CardContent>
            </Card>
         : 
            <TableContainer component={Card}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Response</TableCell>
                    <TableCell>Count</TableCell>
                    <TableCell>% of total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {poll.responses.map((v, idx) => (
                    <TableRow key={idx}>
                      <TableCell component="th" scope="row">
                        {v}
                      </TableCell>
                      <TableCell>{counts[idx] || 0}</TableCell>
                      <TableCell>{Math.round((counts[idx] || 0) / count * 100, 2)}%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                      <TableCell component="th" scope="row">
                       Total
                      </TableCell>
                      <TableCell>{count}</TableCell>
                      <TableCell>100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
        }
    </main>
);