import React from 'react'
import FetchWrapper from '../utilities/fetchwrapper'

interface CheckResponse {
    result?: boolean
}

interface Props {
    FC: React.FC,
    cookie: any
}

class Auth extends React.Component<Props> {
    public state: {
        result: boolean
    }

    public constructor(props) {
        super(props)
        this.state = {
            result: false
        }
    }

    public render() {
        this.checkSession(this.props.cookie).then((response) => {
            this.setState({result: response})
        })

        if (this.state.result) {
            return <this.props.FC />
        } else {
            return <div>no auth</div>
        }
    }
    
    protected async checkSession(cookie: any): Promise<boolean> {
        let response =  await FetchWrapper.get<CheckResponse>('/api/check/', {
            'Content-Type': 'application/json',
            'cookie': cookie
        })

        if (response.raw.ok) {
            return true
        } else {
            return false
        }
    }
}

export default Auth