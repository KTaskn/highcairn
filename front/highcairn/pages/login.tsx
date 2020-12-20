import React from 'react'
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import Fetch from '../utilities/fetch'

const login = () => {
}

const Edit: React.FC = () => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={5}></Grid>
                <Grid item xs={2}>
                    <TextField id="id-form" label="ID" />
                    <TextField
                    id="pasword-form"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    />
                    <Button>Login</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default Edit